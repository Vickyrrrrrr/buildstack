// Utility functions

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(date: any): string {
    if (!date) return 'N/A';

    // Handle Firestore Timestamp
    const dateObj = date.toDate ? date.toDate() : new Date(date);

    // Check if valid date
    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(dateObj);
}

export function formatDateTime(date: any): string {
    if (!date) return 'N/A';

    // Handle Firestore Timestamp
    const dateObj = date.toDate ? date.toDate() : new Date(date);

    // Check if valid date
    if (isNaN(dateObj.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(dateObj);
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
