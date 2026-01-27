import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) return <Navigate to="/login" replace />;

    if (allowedRoles && role && !allowedRoles.includes(role)) {
        // Redirect to a safe page if authorized but wrong role
        return <Navigate to="/students" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
