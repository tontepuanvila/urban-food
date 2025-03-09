import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user's role is authorized
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
