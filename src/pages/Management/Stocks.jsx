import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par un vrai appel API
      // const response = await api.get('/admin/stocks');
      // setStocks(response.data);
      
      setTimeout(() => {
        setStocks([
          {
            id: 1,
            name: "Laptop Pro X1",
            sku: "LAP-X1-001",
            currentStock: 12,
            minStock: 5,
            maxStock: 20,
            lastUpdated: "28/01/2024"
          },
          {
            id: 2,
            name: "Smartphone Galaxy S21",
            sku: "PHN-S21-002",
            currentStock: 8,
            minStock: 3,
            maxStock: 15,
            lastUpdated: "27/01/2024"
          },
          {
            id: 3,
            name: "Casque Audio Pro",
            sku: "AUD-PRO-003",
            currentStock: 0,
            minStock: 2,
            maxStock: 10,
            lastUpdated: "26/01/2024"
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des stocks");
      setLoading(false);
    }
  };

  const updateStock = async (productId, newQuantity) => {
    try {
      // TODO: Remplacer par un vrai appel API
      // await api.patch(`/admin/stocks/${productId}`, { quantity: newQuantity });
      setStocks(stocks.map(stock =>
        stock.id === productId ? { ...stock, currentStock: newQuantity } : stock
      ));
    } catch (err) {
      setError("Erreur lors de la mise à jour du stock");
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
      <h2 className="text-2xl font-bold mb-6">Gestion des Stocks</h2>

      <div className="space-y-4">
        {stocks.map((stock) => (
          <Card key={stock.id}>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{stock.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {stock.sku}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p>Min: {stock.minStock}</p>
                    <p>Max: {stock.maxStock}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateStock(stock.id, Math.max(0, stock.currentStock - 1))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className={`font-bold ${
                      stock.currentStock === 0 ? 'text-red-500' :
                      stock.currentStock <= stock.minStock ? 'text-orange-500' :
                      'text-green-500'
                    }`}>
                      {stock.currentStock}
                    </span>
                    <button 
                      onClick={() => updateStock(stock.id, Math.min(stock.maxStock, stock.currentStock + 1))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Dernière mise à jour: {stock.lastUpdated}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}