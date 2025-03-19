import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

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
              cost: "9.99 €",
              trackingAvailable: true
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
              cost: "14.99 €",
              trackingAvailable: true
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

  const fetchTrackingData = async (orderId) => {
    try {
      // Dans une application réelle, ceci serait un appel API
      // const response = await api.get(`/tracking/${orderId}`);
      // setTrackingInfo(response.data);
      
      // Simulation de données pour démonstration
      const mockData = {
        "CMD-2024-001": {
          status: "Livrée",
          history: [
            { date: "15/01/2024", status: "Commande confirmée", location: "Paris" },
            { date: "16/01/2024", status: "En préparation", location: "Entrepôt Paris" },
            { date: "17/01/2024", status: "En transit", location: "Centre de tri Lyon" },
            { date: "18/01/2024", status: "En livraison", location: "Paris" },
            { date: "19/01/2024", status: "Livrée", location: "Paris" }
          ],
          estimatedDelivery: "19/01/2024"
        },
        "CMD-2024-002": {
          status: "En transit",
          history: [
            { date: "25/01/2024", status: "Commande confirmée", location: "Paris" },
            { date: "26/01/2024", status: "En préparation", location: "Entrepôt Lyon" },
            { date: "27/01/2024", status: "En transit", location: "Centre de tri Marseille" }
          ],
          estimatedDelivery: "30/01/2024"
        }
      };

      if (mockData[orderId]) {
        setTrackingInfo(mockData[orderId]);
        setTrackingOrderId(orderId);
      } else {
        setTrackingInfo(null);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données de suivi:", err);
      setTrackingInfo(null);
    }
  };

  const closeTrackingModal = () => {
    setTrackingInfo(null);
    setTrackingOrderId(null);
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
                {order.shipping.trackingAvailable && (
                  <button
                    onClick={() => fetchTrackingData(order.id)}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Suivre ma commande
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal pour afficher les informations de suivi */}
      {trackingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Suivi de commande #{trackingOrderId}</h3>
                <button 
                  onClick={closeTrackingModal}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Livraison estimée: {trackingInfo.estimatedDelivery}
                </span>
                <span className={`px-3 py-1 rounded-full font-medium ${
                  trackingInfo.status === "Livrée" ? "bg-green-100 text-green-700" :
                  trackingInfo.status === "En transit" ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {trackingInfo.status}
                </span>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Historique de suivi</h4>
                <div className="relative">
                  {/* Ligne verticale reliant les points */}
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    {trackingInfo.history.map((event, index) => {
                      const isLastEvent = index === 0;
                      const isCurrentEvent = index === trackingInfo.history.length - 1;
                      
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="relative z-10">
                            <div className={`w-4 h-4 rounded-full ${
                              isCurrentEvent 
                                ? "bg-blue-700 ring-4 ring-blue-100" // Point actuel plus foncé et avec un anneau
                                : isLastEvent
                                  ? "bg-blue-300" // Premier événement (le plus récent) en vert
                                  : "bg-blue-400" // Autres points plus clairs
                            }`}></div>
                          </div>
                          <div className={`flex-1 pl-2 pb-2 ${isCurrentEvent ? "bg-blue-50 rounded-lg p-3 shadow-sm" : ""}`}>
                            <p className={`font-medium ${isCurrentEvent ? "text-blue-700" : ""}`}>{event.status}</p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {event.date}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {event.location}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeTrackingModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}