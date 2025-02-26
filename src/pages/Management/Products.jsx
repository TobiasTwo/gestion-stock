import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      // TODO: Remplacer par un vrai appel API
      // const response = await api.get('/admin/products');
      // setProducts(response.data);
      
      setTimeout(() => {
        setProducts([
          {
            id: 1,
            name: "Laptop Pro X1",
            price: "1299.99",
            category: "Informatique",
            stock: 12,
            status: "En stock",
            lastUpdated: "28/01/2024"
          },
          {
            id: 2, 
            name: "Smartphone Galaxy S21",
            price: "899.99",
            category: "Téléphonie", 
            stock: 8,
            status: "En stock",
            lastUpdated: "27/01/2024"
          },
          {
            id: 3,
            name: "Casque Audio Pro",
            price: "199.99",
            category: "Audio",
            stock: 0,
            status: "Rupture",
            lastUpdated: "26/01/2024"
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des produits");
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // TODO: Remplacer par un vrai appel API
        // await api.patch(`/admin/products/${editingProduct.id}`, formData);
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { ...p, ...formData, lastUpdated: new Date().toLocaleDateString('fr-FR') }
            : p
        ));
      } else {
        // TODO: Remplacer par un vrai appel API
        // const response = await api.post('/admin/products', formData);
        const newProduct = {
          id: products.length + 1,
          ...formData,
          status: formData.stock > 0 ? "En stock" : "Rupture",
          lastUpdated: new Date().toLocaleDateString('fr-FR')
        };
        setProducts([...products, newProduct]);
      }
      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: '', stock: 0 });
    } catch (err) {
      setError("Erreur lors de l'enregistrement du produit");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock
    });
    setShowAddModal(true);
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      // TODO: Remplacer par un vrai appel API  
      // await api.delete(`/admin/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (err) {
      setError("Erreur lors de la suppression du produit");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center">Chargement...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center text-red-500">{error}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Produits</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', price: '', category: '', stock: 0 });
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter un produit
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Prix</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {editingProduct ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">Mis à jour le {product.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.price} €</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === "En stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => handleEdit(product)}
                    >
                      Modifier
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}