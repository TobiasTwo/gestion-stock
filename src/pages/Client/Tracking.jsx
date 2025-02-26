import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrackingData = async (number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Remplacer par votre appel API
      // const response = await api.get(`/tracking/${number}`);
      // setTrackingData(response.data);
      
      // Simulation de données pour démonstration
      const mockData = {
        "CMD-2024-001": {
          status: "En transit",
          history: [
            { date: "2024-01-15", status: "Commande confirmée", location: "Paris" },
            { date: "2024-01-16", status: "En préparation", location: "Entrepôt Paris" },
            { date: "2024-01-17", status: "En transit", location: "Centre de tri Lyon" }
          ],
          estimatedDelivery: "2024-01-19"
        }
      };

      if (mockData[number]) {
        setTrackingData(mockData[number]);
      } else {
        setTrackingData(null);
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la recherche");
      console.error("Erreur de recherche:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      fetchTrackingData(trackingNumber);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Suivi de commande</h2>
      
      <Card className="mb-6">
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Entrez votre numéro de suivi"
              className="flex-1 p-2 border rounded"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Recherche...' : 'Rechercher'}
            </button>
          </form>
        </div>
      </Card>

      {error && (
        <Card>
          <div className="p-4 text-center text-red-500">
            {error}
          </div>
        </Card>
      )}

      {isLoading && (
        <Card>
          <div className="p-4 text-center text-gray-500">
            Chargement des informations...
          </div>
        </Card>
      )}

      {!isLoading && trackingData && (
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Commande {trackingNumber}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {trackingData.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">
                Livraison estimée: {trackingData.estimatedDelivery}
              </p>
            </div>

            <div className="space-y-8">
              {trackingData.history.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{event.status}</p>
                    <p className="text-sm text-gray-500">
                      {event.date} - {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {!isLoading && trackingNumber && !trackingData && !error && (
        <Card>
          <div className="p-4 text-center text-gray-500">
            Aucune commande trouvée avec ce numéro de suivi
          </div>
        </Card>
      )}
    </div>
  );
}