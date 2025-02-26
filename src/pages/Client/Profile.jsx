import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Profile() {
  const [userData, setUserData] = useState({
    id: "USR-2024-001",
    nom: "Martin Dupont",
    email: "martin.dupont@email.com",
    telephone: "06 12 34 56 78",
    adresse: {
      rue: "123 rue de Paris",
      ville: "Paris",
      codePostal: "75001",
      pays: "France"
    },
    dateInscription: "15/01/2024"
  });

  const [commandes, setCommandes] = useState([
    { id: "CMD-2024-001", date: "15/01/2024", montant: "890 €", statut: "Livrée" },
    { id: "CMD-2024-002", date: "20/01/2024", montant: "1 200 €", statut: "En cours" },
    { id: "CMD-2024-003", date: "25/01/2024", montant: "450 €", statut: "En attente" }
  ]);

  useEffect(() => {
    // Remplacer par des appels API
    // fetchUserData();
    // fetchUserOrders();
  }, []);

  const handleUpdateProfile = async (newData) => {
    try {
      // Appel API à implémenter
      // await api.put(`/users/${userData.id}`, newData);
      setUserData(newData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-4">Informations personnelles</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Nom complet</label>
                <p className="font-medium">{userData.nom}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Téléphone</label>
                <p className="font-medium">{userData.telephone}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Adresse</label>
                <p className="font-medium">
                  {userData.adresse.rue}<br />
                  {userData.adresse.codePostal} {userData.adresse.ville}<br />
                  {userData.adresse.pays}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Membre depuis</label>
                <p className="font-medium">{userData.dateInscription}</p>
              </div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {/* Ouvrir modal de modification */}}
              >
                Modifier mes informations
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-4">Mes dernières commandes</h3>
            <div className="space-y-4">
              {commandes.map((commande) => (
                <div key={commande.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{commande.id}</p>
                    <p className="text-sm text-gray-500">{commande.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{commande.montant}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      commande.statut === "Livrée" ? "bg-green-100 text-green-700" :
                      commande.statut === "En cours" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {commande.statut}
                    </span>
                  </div>
                </div>
              ))}
              <button 
                className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                onClick={() => {/* Navigation vers l'historique complet */}}
              >
                Voir toutes mes commandes
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}