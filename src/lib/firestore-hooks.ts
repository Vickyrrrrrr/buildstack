import { useState, useEffect } from 'react';
import {
    doc,
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
    limit,
    FirestoreError
} from 'firebase/firestore';
import { db } from './firebase';
import { Project, Station, UserProfile, Invoice, Deliverable, PortfolioItem } from '@/types';

// HOOKS

export function useUserProfile(uid: string | undefined) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setLoading(false);
            return;
        }

        const unsub = onSnapshot(doc(db, 'buildstack_users', uid), (docSnap) => {
            if (docSnap.exists()) {
                setProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsub();
    }, [uid]);

    return { profile, loading };
}

export function useProject(projectId: string | null) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    useEffect(() => {
        if (!projectId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const unsub = onSnapshot(
            doc(db, 'buildstack_projects', projectId),
            (docSnap) => {
                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() } as Project);
                } else {
                    setProject(null);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching project:", err);
                setError(err as FirestoreError);
                setLoading(false);
            }
        );

        return () => unsub();
    }, [projectId]);

    return { project, loading, error };
}

export function useStations(projectId: string | null, clientId?: string) {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) {
            setStations([]);
            setLoading(false);
            return;
        }

        let q = query(
            collection(db, 'buildstack_stations'),
            where('projectId', '==', projectId),
            orderBy('order', 'asc')
        );

        if (clientId) {
            q = query(
                collection(db, 'buildstack_stations'),
                where('projectId', '==', projectId),
                where('clientId', '==', clientId),
                orderBy('order', 'asc')
            );
        }

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Station[];
            setStations(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching stations:', error);
            setStations([]);
            setLoading(false);
        });

        return () => unsub();
    }, [projectId]);

    return { stations, loading };
}

export function useProjects(clientId?: string) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let q = query(
            collection(db, 'buildstack_projects'),
            orderBy('createdAt', 'desc')
        );

        if (clientId) {
            q = query(
                collection(db, 'buildstack_projects'),
                where('clientId', '==', clientId),
                orderBy('createdAt', 'desc')
            );
        }

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Project[];
            setProjects(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching projects:', error);
            setProjects([]);
            setLoading(false);
        });

        return () => unsub();
    }, [clientId]);

    return { projects, loading };
}

export function useInvoice(projectId: string | null, clientId?: string) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) {
            setInvoice(null);
            setLoading(false);
            return;
        }

        let q = query(
            collection(db, 'buildstack_invoices'),
            where('projectId', '==', projectId),
            limit(1)
        );

        if (clientId) {
            q = query(
                collection(db, 'buildstack_invoices'),
                where('projectId', '==', projectId),
                where('clientId', '==', clientId),
                limit(1)
            );
        }

        const unsub = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                setInvoice({ id: doc.id, ...doc.data() } as Invoice);
            } else {
                setInvoice(null);
            }
            setLoading(false);
        }, (error) => {
            console.error('Error fetching invoice:', error);
            setInvoice(null);
            setLoading(false);
        });

        return () => unsub();
    }, [projectId]);

    return { invoice, loading };
}

export function useDeliverable(projectId: string | null, clientId?: string) {
    const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) {
            setDeliverable(null);
            setLoading(false);
            return;
        }

        let q = query(
            collection(db, 'buildstack_deliverables'),
            where('projectId', '==', projectId),
            limit(1)
        );

        if (clientId) {
            q = query(
                collection(db, 'buildstack_deliverables'),
                where('projectId', '==', projectId),
                where('clientId', '==', clientId),
                limit(1)
            );
        }

        const unsub = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                setDeliverable({ id: doc.id, ...doc.data() } as Deliverable);
            } else {
                setDeliverable(null);
            }
            setLoading(false);
        }, (error) => {
            console.error('Error fetching deliverable:', error);
            setDeliverable(null);
            setLoading(false);
        });

        return () => unsub();
    }, [projectId]);

    return { deliverable, loading };
}

export function useInvoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'buildstack_invoices'),
            orderBy('createdAt', 'desc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Invoice[];
            setInvoices(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching all invoices:', error);
            setInvoices([]);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { invoices, loading };
}

export function usePortfolio() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'buildstack_portfolio'),
            orderBy('createdAt', 'desc')
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as PortfolioItem[];
            setItems(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching portfolio:', error);
            setItems([]);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { items, loading };
}

