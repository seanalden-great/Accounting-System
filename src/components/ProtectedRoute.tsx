// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
  const { token } = useAuth();

  // Jika tidak ada token JWT, paksa kembali ke halaman Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, render layout halaman ERP
  return <Outlet />;
}