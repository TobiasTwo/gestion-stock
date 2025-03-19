import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const staticProducts = [
    {
      id: 7,
      name: "Lenovo Ideapad Slim 5",
      price: 613,
      description: "Lenovo I5 16 GB RAM",
      categoryId: 1,
      stockId: 1,
      stock: 10 // Valeur par défaut
    },
    {
      id: 9,
      name: "Mac Book Air",
      price: 1300,
      description: "Mac",
      categoryId: 2,
      stockId: 1,
      stock: 5 // Valeur par défaut
    },
    {
      id: 10,
      name: "Asus",
      price: 700.8,
      description: "Pc de ouf",
      categoryId: 1,
      stockId: 1,
      stock: 15 // Valeur par défaut
    }
  ];

  const [imageError, setImageError] = useState({});
  const [notification, setNotification] = useState({ visible: false, product: null });
  const [cartCount, setCartCount] = useState(0);
  const [productStocks, setProductStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = 'products_cache';
  const cacheExpiration = 5 * 60 * 1000; // 5 minutes en millisecondes

  useEffect(() => {
    // Mettre à jour le compteur du panier au chargement de la page
    updateCartCount();
    
    // Vérifier si nous avons des données en cache
    const cachedData = getCachedData();
    
    if (cachedData) {
      // Utiliser les données en cache
      setProducts(cachedData.products);
      setProductStocks(cachedData.stocks);
      setLoading(false);
    } else {
      // Sinon, utiliser les données statiques temporairement
      setProducts(staticProducts);
      setLoading(false);
    }
    
    // Puis mettre à jour les données depuis l'API
    fetchProducts();
  }, []);

  const getCachedData = () => {
    try {
      const cachedString = localStorage.getItem(cacheKey);
      if (!cachedString) return null;
      
      const cache = JSON.parse(cachedString);
      const now = new Date().getTime();
      
      // Vérifier si le cache n'est pas expiré
      if (cache.timestamp && now - cache.timestamp < cacheExpiration) {
        return {
          products: cache.products,
          stocks: cache.stocks
        };
      }
      return null;
    } catch (e) {
      console.error("Erreur lors de la lecture du cache:", e);
      return null;
    }
  };

  const updateCache = (products, stocks) => {
    try {
      const cacheData = {
        products,
        stocks,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (e) {
      console.error("Erreur lors de la mise en cache:", e);
    }
  };

  const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetchWithTimeout('/api/products');
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Chargement des stocks en parallèle
      const uniqueStockIds = [...new Set(data.map(product => product.stockId))];
      const stockPromises = uniqueStockIds.map(stockId => fetchProductStock(stockId));
      
      // Définir les produits uniquement après avoir chargé les stocks
      await Promise.all(stockPromises);
      setProducts(data);
      
      // Mettre à jour le cache
      updateCache(data, productStocks);
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err);
    }
  };

  const fetchProductStock = async (stockId) => {
    if (!stockId) return;
    
    try {
      const response = await fetchWithTimeout(`/api/stock/${stockId}`);
      
      if (!response.ok) {
        throw new Error(`Erreur API Stock: ${response.status}`);
      }
      
      const stockData = await response.json();
      setProductStocks(prev => ({
        ...prev,
        [stockId]: stockData
      }));
    } catch (err) {
      console.error(`Erreur lors du chargement du stock ${stockId}:`, err);
      // Au lieu d'échouer complètement, on initialise avec une valeur par défaut
      setProductStocks(prev => ({
        ...prev,
        [stockId]: { quantity: 0 }
      }));
    }
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

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
      cart.push({ 
        ...product, 
        quantity: 1,
        stock: productStocks[product.stockId]?.quantity || 0
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Mettre à jour le compteur du panier
    updateCartCount();
    
    // Afficher la notification
    setNotification({ visible: true, product: product });
    
    // Faire disparaître la notification après 3 secondes
    setTimeout(() => {
      setNotification({ visible: false, product: null });
    }, 3000);
  };

  const navigateToCart = () => {
    navigate('/client/cart');
  };

  if (loading) {
    return <div className="p-6 text-center">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 relative">
      {/* Contenu principal */}
      <h2 className="text-2xl font-bold mb-6">Nos Produits</h2>
      
      {/* Notification popup */}
      {notification.visible && notification.product && (
        <div className="fixed top-6 right-6 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded shadow-md z-50 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>
              <span className="font-bold">{notification.product.name}</span> ajouté au panier
            </p>
          </div>
        </div>
      )}
      
      {/* Bouton du panier avec style modifié pour éviter l'avertissement */}
      <div 
        onClick={navigateToCart}
        className="absolute right-6 bg-blue-600 text-white rounded w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-blue-700 z-40"
        style={{ top: '5rem' }} // Position absolue avec valeur fixe au lieu de fixed
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const stock = productStocks[product.stockId]?.quantity || 0;
          return (
            <Card 
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={(e) => handleProductClick(product.id)}
            >
              <div className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                  <img 
                    src={imageError[product.id] ? '/placeholder.jpg' : `/images/placeholder.jpg`}
                    alt={product.name}
                    onError={() => handleImageError(product.id)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{product.price} €</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    stock > 10 
                      ? "bg-green-100 text-green-700"
                      : stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}>
                    {stock > 0 ? `${stock} en stock` : "Rupture de stock"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Catégorie ID: {product.categoryId}</p>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <button
                  onClick={(e) => addToCart(e, product)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={stock <= 0}
                >
                  Ajouter au panier
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}