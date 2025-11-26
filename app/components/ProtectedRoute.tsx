import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '~/utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute component that checks authentication
 * Redirects to /login if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Only check authentication on client side
        if (!isAuthenticated()) {
            navigate('/login', { replace: true });
        } else {
            setIsChecking(false);
        }
    }, [navigate]);

    // Show nothing while checking (prevents flash of content)
    if (isChecking) {
        return null;
    }

    return <>{children}</>;
}
