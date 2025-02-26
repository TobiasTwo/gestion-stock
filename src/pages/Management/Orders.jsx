import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par un vrai appel API
      // const response = await api.get('/admin/orders');
      // setOrders(response.data);
      
      setTimeout(() => {
        setOrders([
          {
            id: "CMD-2024-001",
            clientId: "CLT-001",
            clientName: "Jean Dupont",
            date: "28/01/2024",
            total: "890 €",
            status: "Livrée",
            paymentStatus: "Payée",
            paymentMethod: "Carte bancaire",
            items: [
              { name: "Laptop Pro X1", quantity: 1, price: "799 €", sku: "LAP-X1-001" },
              { name: "Souris sans fil", quantity: 1, price: "91 €", sku: "MOU-W1-002" }
            ],
            shipping: {
              address: "123 rue de Paris, 75001 Paris",
              method: "Colissimo",
              cost: "9.99 €",
              trackingNumber: "CO123456789FR",
              estimatedDelivery: "30/01/2024"
            },
            history: [
              { date: "28/01/2024 14:30", status: "Commande créée" },
              { date: "28/01/2024 14:35", status: "Paiement reçu" },
              { date: "28/01/2024 16:00", status: "En préparation" },
              { date: "28/01/2024 17:30", status: "Expédiée" }
            ]
          },
          {
            id: "CMD-2024-002", 
            clientId: "CLT-002",
            clientName: "Marie Martin",
            date: "25/01/2024",
            total: "1299 €",
            status: "En préparation",
            paymentStatus: "En attente",
            paymentMethod: "Virement bancaire",
            items: [
              { name: "Smartphone Galaxy S21", quantity: 1, price: "899 €", sku: "PHN-S21-001" },
              { name: "Coque Protection", quantity: 1, price: "29 €", sku: "ACC-CS21-001" },
              { name: "Chargeur Rapide", quantity: 2, price: "185.50 €", sku: "ACC-CHR-001" }
            ],
            shipping: {
              address: "456 avenue Victor Hugo, 69002 Lyon",
              method: "Chronopost",
              cost: "14.99 €",
              trackingNumber: "Pending",
              estimatedDelivery: "27/01/2024"
            },
            history: [
              { date: "25/01/2024 10:15", status: "Commande créée" },
              { date: "25/01/2024 10:20", status: "En attente de paiement" }
            ]
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des commandes");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // TODO: Remplacer par un vrai appel API
      // await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          const newHistory = [...order.history, {
            date: new Date().toLocaleString('fr-FR'),
            status: `Statut changé à: ${newStatus}`
          }];
          return { ...order, status: newStatus, history: newHistory };
        }
        return order;
      }));
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  const updateTrackingNumber = async (orderId, trackingNumber) => {
    try {
      // TODO: Remplacer par un vrai appel API
      // await api.patch(`/admin/orders/${orderId}/tracking`, { trackingNumber });
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, shipping: { ...order.shipping, trackingNumber } }
          : order
      ));
    } catch (err) {
      setError("Erreur lors de la mise à jour du numéro de suivi");
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4 text-center">Chargement des commandes...</div>
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
        <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">Toutes les commandes</option>
          <option value="En attente">En attente</option>
          <option value="En préparation">En préparation</option>
          <option value="Expédiée">Expédiée</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">Commande #{order.id}</p>
                  <p className="text-sm text-gray-500">Client: {order.clientName} (#{order.clientId})</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                  <p className="text-sm text-gray-500">Paiement: {order.paymentStatus} ({order.paymentMethod})</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold">{order.total}</span>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm ${
                      order.status === "Livrée" ? "bg-green-100 text-green-700" :
                      order.status === "En préparation" ? "bg-blue-100 text-blue-700" :
                      order.status === "Expédiée" ? "bg-purple-100 text-purple-700" :
                      order.status === "Annulée" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <option value="En attente">En attente</option>
                    <option value="En préparation">En préparation</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Articles</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.quantity}) - SKU: {item.sku}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <h3 className="font-medium mb-2">Livraison</h3>
                <div className="text-sm space-y-1">
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.method} - {order.shipping.cost}</p>
                  <div className="flex items-center gap-2">
                    <span>Numéro de suivi:</span>
                    <input 
                      type="text"
                      value={order.shipping.trackingNumber}
                      onChange={(e) => updateTrackingNumber(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                      placeholder="Entrer le numéro de suivi"
                    />
                  </div>
                  <p>Livraison estimée: {order.shipping.estimatedDelivery}</p>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <h3 className="font-medium mb-2">Historique</h3>
                <div className="space-y-1">
                  {order.history.map((event, index) => (
                    <p key={index} className="text-sm">
                      {event.date} - {event.status}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}