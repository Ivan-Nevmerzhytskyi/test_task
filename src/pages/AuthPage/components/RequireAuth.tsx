import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../store/AuthContext';

export const RequireAuth: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ pathname }} replace />;
  }

  return <Outlet />;
};
