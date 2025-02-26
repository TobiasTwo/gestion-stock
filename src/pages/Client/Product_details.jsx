import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simuler le chargement des détails du produit
    setLoading(true);
    const products = [
      {
        id: "PROD-001",
        name: "Ordinateur Portable Pro",
        price: "1299",
        category: "Informatique",
        image: "/images/laptop.jpg",
        stock: 12,
        description: "Ordinateur portable haute performance pour professionnels",
        specifications: [
          "Processeur Intel i7",
          "16 GB RAM",
          "512 GB SSD",
          "Écran 15.6\" 4K"
        ]
      },
      {
        id: "PROD-002",
        name: "Smartphone Galaxy S21",
        price: "899",
        category: "Téléphonie",
        image: "/images/smartphone.jpg",
        stock: 25,
        description: "Smartphone haut de gamme avec appareil photo professionnel",
        specifications: [
          "Écran 6.2\" AMOLED",
          "128 GB Stockage",
          "8 GB RAM",
          "5G Compatible"
        ]
      }
    ];

    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier');
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4">Chargement...</div>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <Card>
          <div className="p-4">
            <p className="text-red-500">Produit non trouvé</p>
            <button
              onClick={() => navigate('/client/products')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retour aux produits
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow"
                onError={(e) => e.target.src = '/placeholder.jpg'}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl text-blue-600 mb-4">{product.price} €</p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Spécifications:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="text-gray-600">{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold">Quantité:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded"
                />
                <span className="text-gray-600">
                  {product.stock} disponibles
                </span>
              </div>

              <div className="space-x-4">
                <button
                  onClick={addToCart}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Ajouter au panier
                </button>
                <button
                  onClick={() => navigate('/client/products')}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 