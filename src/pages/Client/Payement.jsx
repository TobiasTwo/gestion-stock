import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';

export default function PaymentPage() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Données simulées de la commande
  const orderSummary = {
    items: [
      { id: 1, name: "Laptop Pro X1", price: "1299.99 €", quantity: 1 },
      { id: 2, name: "Casque Audio Sans Fil", price: "199.99 €", quantity: 1 }
    ],
    subtotal: "1499.98 €",
    shipping: "9.99 €",
    total: "1509.97 €"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // À remplacer par un vrai appel API
      // const response = await api.post('/payments', {
      //   paymentInfo,
      //   orderId: 'XXX',
      //   amount: orderSummary.total
      // });

      // Redirection après paiement réussi
      // navigate('/confirmation');
      
    } catch (err) {
      setError("Une erreur est survenue lors du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Paiement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-4">Informations de paiement</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom sur la carte</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentInfo.cardholderName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Numéro de carte</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  maxLength="16"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date d'expiration</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                    maxLength="3"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? 'Traitement...' : 'Payer maintenant'}
              </button>
            </form>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-4">Récapitulatif de la commande</h3>
            
            <div className="space-y-4">
              {orderSummary.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{orderSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{orderSummary.shipping}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>{orderSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}