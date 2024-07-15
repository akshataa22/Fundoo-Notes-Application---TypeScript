import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <>{children}</>;
  }

  return <Navigate to="/dashboard" replace />
};

export default AuthRoute;