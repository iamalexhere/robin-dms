// Authentication utility functions for frontend-only auth

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    name: string;
}

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

/**
 * Check if user is authenticated by verifying sessionStorage
 */
export function isAuthenticated(): boolean {
    if (!isBrowser()) return false;

    const authToken = sessionStorage.getItem('authToken');
    const user = sessionStorage.getItem('user');
    return !!(authToken && user);
}

/**
 * Get current logged-in user from sessionStorage
 */
export function getUser(): User | null {
    if (!isBrowser()) return null;

    const userStr = sessionStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr) as User;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}

/**
 * Clear all session data (for logout)
 */
export function clearSession(): void {
    if (!isBrowser()) return;

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    // Also clear any other session-related data if needed
}

/**
 * Get user initials from name (for avatar display)
 */
export function getUserInitials(name: string): string {
    if (!name) return '?';

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    // Return first letter of first name and last name
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
