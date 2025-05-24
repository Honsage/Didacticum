import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { auth } = useSelector(state => state.user);
    
    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 