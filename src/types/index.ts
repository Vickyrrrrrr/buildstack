import type { Timestamp } from 'firebase/firestore';

// Types for Buildstack

type FirestoreDateValue = Date | Timestamp | null;

export interface User {
    id: string;
    email: string;
    role: 'admin' | 'client';
    name?: string;
}

export interface UserProfile {
    id: string;
    email: string;
    role: 'admin' | 'client';
    name?: string;
    image?: string;
    businessName?: string;
    description?: string;
    referenceUrls?: string[];
    createdAt: FirestoreDateValue;
}

export interface Client {
    id: string;
    userId: string;
    businessName: string;
    websiteType: 'business' | 'portfolio' | 'landing' | 'ecommerce';
    description: string;
    referenceUrls?: string[];
    logoUrl?: string;
    createdAt: Date;
}

export interface Project {
    id: string;
    clientId: string;
    name: string;
    websiteType: 'business' | 'portfolio' | 'landing' | 'ecommerce';
    startDate: FirestoreDateValue;
    estimatedDeliveryDate: FirestoreDateValue;
    currentStage: string;
    progress: number;
    status: 'active' | 'completed' | 'on-hold' | 'pending';
    createdAt: FirestoreDateValue;
    email?: string;
    company?: string;
    message?: string;
}

export type StationStatus = 'pending' | 'active' | 'completed';

export interface Station {
    id: string;
    projectId: string;
    name: string;
    status: 'pending' | 'active' | 'completed';
    updateNote?: string;
    order: number;
    updatedAt: FirestoreDateValue;
}

export interface Deliverable {
    id: string;
    projectId: string;
    previewUrl?: string;
    filesUrl?: string;
    createdAt: Date;
}

export interface Invoice {
    id: string;
    projectId: string;
    invoiceNumber: string;
    amount: number;
    status: 'pending' | 'paid';
    pdfUrl?: string;
    createdAt: Date;
}

export interface PortfolioItem {
    id: string;
    name: string;
    description: string;
    link: string;
    category: string;
    imageUrl?: string;
    createdAt: FirestoreDateValue;
}

// Station names (fixed order)
export const STATION_NAMES = [
    'Requirements Received',
    'Design Phase',
    'Development Phase',
    'Review & Fixes',
    'Delivered',
] as const;

export type StationName = typeof STATION_NAMES[number];
