import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const adminLinks = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Produits', icon: '📦' },
    { path: '/orders', label: 'Commandes', icon: '📋' },
    { path: '/stocks', label: 'Stocks', icon: '🏭' },
    { path: '/users', label: 'Utilisateurs', icon: '👥' }
  ];

  const clientLinks = [
    { path: '/client/products', label: 'Produits', icon: '🛍️' },
    { path: '/client/cart', label: 'Panier', icon: '🛒' },
    { path: '/client/orders', label: 'Mes Commandes', icon: '📦' },
    { path: '/client/profile', label: 'Mon Profil', icon: '👤' },
    { path: '/client/tracking', label: 'Suivi', icon: '🚚' }
  ];

  const links = user?.role === 'admin' ? adminLinks : clientLinks;

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">{user?.role === 'admin' ? 'Administration' : 'Espace Client'}</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-2 p-3 rounded hover:bg-gray-700 ${
              location.pathname === link.path ? 'bg-gray-700' : ''
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
} 