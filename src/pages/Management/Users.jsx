import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par un vrai appel API
      // const response = await api.get('/admin/users');
      // setUsers(response.data);
      
      setTimeout(() => {
        setUsers([
          {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            status: "active",
            lastLogin: "28/01/2024",
            createdAt: "01/01/2024"
          },
          {
            id: 2,
            username: "manager",
            email: "manager@example.com", 
            role: "manager",
            status: "active",
            lastLogin: "27/01/2024",
            createdAt: "15/01/2024"
          },
          {
            id: 3,
            username: "user1",
            email: "user1@example.com",
            role: "user",
            status: "inactive",
            lastLogin: "20/01/2024",
            createdAt: "10/01/2024"
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des utilisateurs");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // TODO: Remplacer par un vrai appel API
        // await api.patch(`/admin/users/${editingUser.id}`, formData);
        setUsers(users.map(u => 
          u.id === editingUser.id 
            ? { ...u, ...formData }
            : u
        ));
      } else {
        // TODO: Remplacer par un vrai appel API
        // const response = await api.post('/admin/users', formData);
        setUsers([...users, { 
          id: users.length + 1,
          ...formData,
          createdAt: new Date().toLocaleDateString('fr-FR'),
          lastLogin: '-'
        }]);
      }
      setShowAddModal(false);
      setEditingUser(null);
      setFormData({ username: '', email: '', role: 'user', status: 'active' });
    } catch (err) {
      setError("Une erreur est survenue lors de l'enregistrement");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      // TODO: Remplacer par un vrai appel API
      // await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      setError("Une erreur est survenue lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center">Chargement...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter un utilisateur
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-gray-500">{user.email}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'manager' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setEditingUser(user);
                    setFormData({
                      username: user.username,
                      email: user.email,
                      role: user.role,
                      status: user.status
                    });
                    setShowAddModal(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? 'Modifier' : 'Ajouter'} un utilisateur
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Nom d'utilisateur</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full border p-2 rounded"
                >
                  <option value="user">Utilisateur</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border p-2 rounded"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingUser(null);
                    setFormData({ username: '', email: '', role: 'user', status: 'active' });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingUser ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}