import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: "PROD-001",
      name: "Ordinateur Portable Pro",
      price: "1299 €",
      category: "Informatique",
      image: "/images/laptop.jpg",
      stock: 12
    },
    {
      id: "PROD-002", 
      name: "Smartphone Galaxy S21",
      price: "899 €",
      category: "Téléphonie",
      image: "/images/smartphone.jpg",
      stock: 25
    },
    {
      id: "PROD-003",
      name: "Casque Audio Sans Fil",
      price: "199 €", 
      category: "Accessoires",
      image: "/images/headphones.jpg",
      stock: 45
    },
    {
      id: "PROD-004",
      name: "Écran 27\" 4K",
      price: "449 €",
      category: "Périphériques",
      image: "/images/monitor.jpg",
      stock: 8
    }
  ]);

  const [imageError, setImageError] = useState({});

  const handleProductClick = (productId) => {
    navigate(`/client/products/${productId}`);
  };

  const handleImageError = (productId) => {
    setImageError(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    alert('Produit ajouté au panier');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Nos Produits</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={(e) => handleProductClick(product.id)}
          >
            <div className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                <img 
                  src={imageError[product.id] ? '/placeholder.jpg' : product.image}
                  alt={product.name}
                  onError={() => handleImageError(product.id)}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">{product.price}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  product.stock > 10 
                    ? "bg-green-100 text-green-700"
                    : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}>
                  {product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{product.category}</p>
              <button
                onClick={(e) => addToCart(e, product)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Ajouter au panier
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}