'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const adminEmails = ['vickynishad110@gmail.com', 'contactme@buildstack.live'];
    const isAdmin = user?.email ? adminEmails.includes(user.email.toLowerCase().trim()) : false;

    useEffect(() => {
        // Handle redirect result (for mobile/fallback flow)
        getRedirectResult(auth).catch((error) => {
            console.error("Error returning from redirect login:", error);
        });

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            // Sync user to Firestore in background (non-blocking)
            if (firebaseUser) {
                const email = firebaseUser.email?.toLowerCase().trim() || '';
                const role = (email === 'vickynishad110@gmail.com' || email === 'contactme@buildstack.live') ? 'admin' : 'client';
                setDoc(doc(db, 'buildstack_users', firebaseUser.uid), {
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                    image: firebaseUser.photoURL,
                    role: role,
                    lastLogin: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                }, { merge: true }).catch(error => {
                    console.error('Error syncing user (non-blocking):', error);
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            console.warn('Google popup sign-in failed, attempting redirect fallback:', error);
            // Fallback to redirect if popup fails (e.g., blocked, mobile)
            // Don't redirect if the user explicitly closed the popup
            if (error.code !== 'auth/popup-closed-by-user') {
                try {
                    await signInWithRedirect(auth, provider);
                } catch (redirectError) {
                    console.error('Google redirect sign-in failed:', redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
