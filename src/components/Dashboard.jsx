import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const cart = "";

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Gestion Stock</h1>
              </div>
              <div className="flex items-center">
                
                <span className="mr-4"></span>
                <span className="mr-4">{user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 