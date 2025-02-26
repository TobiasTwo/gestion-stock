import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: parseInt(newQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/client/payment');
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center">Chargement du panier...</div>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center">
            <p className="mb-4">Votre panier est vide</p>
            <button 
              onClick={() => navigate('/client/products')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continuer mes achats
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mon Panier</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => e.target.src = '/placeholder.jpg'}
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price} € / unité</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="0"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </Card>
        ))}
        
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">Total: {getTotal().toFixed(2)} €</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/client/products')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Continuer mes achats
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Payer
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}