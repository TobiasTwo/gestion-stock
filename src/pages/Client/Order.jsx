import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simuler un appel API
      // const response = await api.get('/orders');
      // setOrders(response.data);
      
      // Données simulées
      setTimeout(() => {
        setOrders([
          {
            id: "CMD-2024-001",
            date: "28/01/2024",
            total: "890 €",
            status: "Livrée",
            items: [
              { name: "Laptop Pro X1", quantity: 1, price: "799 €" },
              { name: "Souris sans fil", quantity: 1, price: "91 €" }
            ],
            shipping: {
              address: "123 rue de Paris, 75001 Paris",
              method: "Colissimo",
              cost: "9.99 €"
            }
          },
          {
            id: "CMD-2024-002",
            date: "25/01/2024",
            total: "1299 €",
            status: "En cours",
            items: [
              { name: "Smartphone Galaxy S21", quantity: 1, price: "899 €" },
              { name: "Coque Protection", quantity: 1, price: "29 €" },
              { name: "Chargeur Rapide", quantity: 2, price: "185.50 €" }
            ],
            shipping: {
              address: "123 rue de Paris, 75001 Paris",
              method: "Chronopost",
              cost: "14.99 €"
            }
          }
        ]);
        setLoading(false);
      }, 500);

    } catch (err) {
      setError("Une erreur est survenue lors du chargement des commandes");
      setLoading(false);
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
      <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">Commande #{order.id}</p>
                  <p className="text-sm text-gray-500">Passée le {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{order.total}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === "Livrée" ? "bg-green-100 text-green-700" :
                    order.status === "En cours" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Articles</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <h3 className="font-medium mb-2">Livraison</h3>
                <p className="text-sm">{order.shipping.address}</p>
                <p className="text-sm">
                  {order.shipping.method} - {order.shipping.cost}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}