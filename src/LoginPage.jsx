import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card } from './components/ui/Card';

export default function LoginPage() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'client' // Par défaut en mode client
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une authentification
    login({
      id: 1,
      username: credentials.email,
      role: credentials.role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mode</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            >
              <option value="client">Client</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </Card>
    </div>
  );
}
