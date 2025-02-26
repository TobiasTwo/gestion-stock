import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      // Simuler un appel API
      // const response = await api.get(`/products/${id}`);
      // setProduct(response.data);
      
      // Données simulées
      setTimeout(() => {
        setProduct({
          id: id,
          name: "Laptop Pro X1",
          price: "1299.99 €",
          category: "Informatique",
          description: "Ordinateur portable haute performance avec processeur dernière génération",
          specs: {
            processor: "Intel i7 12th Gen",
            ram: "16GB DDR4",
            storage: "512GB SSD",
            screen: "15.6\" 4K",
          },
          stock: 12,
          images: [
            "/images/laptop-1.jpg",
            "/images/laptop-2.jpg",
            "/images/laptop-3.jpg"
          ],
          reviews: [
            { id: 1, user: "Jean D.", rating: 5, comment: "Excellent produit, très satisfait !" },
            { id: 2, user: "Marie L.", rating: 4, comment: "Bon rapport qualité/prix" }
          ]
        });
        setLoading(false);
      }, 500);

    } catch (err) {
      setError("Erreur lors du chargement du produit");
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex gap-2 mt-4">
              {product.images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`${product.name} - vue ${index + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                />
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-bold">{product.price}</span>
              <span className={`px-3 py-1 rounded-full ${
                product.stock > 10 ? 'bg-green-100 text-green-700' :
                product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="font-bold mb-2">Caractéristiques :</h2>
              <ul className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
              disabled={product.stock === 0}
            >
              Ajouter au panier
            </button>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="p-4">
          <h2 className="font-bold mb-4">Avis clients</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{review.user}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}