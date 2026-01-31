import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (user.id && user.email) {
                try {
                    // Define role based on email - check robustly
                    const normalizedEmail = user.email.toLowerCase().trim();
                    const role = normalizedEmail === "vickynishad110@gmail.com" ? "admin" : "client";

                    // Sync user to Firestore
                    await setDoc(doc(db, "buildstack_users", user.id), {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: role,
                        lastLogin: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    }, { merge: true });
                } catch (error) {
                    console.error("Error syncing user to Firestore:", error);
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).id = token.sub;
                // Add role to session - check robustly
                const normalizedEmail = session.user.email?.toLowerCase().trim();
                (session.user as any).role = normalizedEmail === "vickynishad110@gmail.com" ? "admin" : "client";
            }
            return session;
        },
    },
})

export { handler as GET, handler as POST }

