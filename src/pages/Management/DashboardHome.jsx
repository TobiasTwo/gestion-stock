import React from 'react';
import { Card } from '../../components/ui/Card';

export default function DashboardHome() {
  // Données statiques (à remplacer par des appels API)
  const statsGlobales = [
    { titre: "Total des ventes", valeur: "45 890 €", evolution: "+8.5%" },
    { titre: "Commandes en cours", valeur: "127", evolution: "+12%" }, 
    { titre: "Articles en stock", valeur: "1 459", evolution: "-3%" }
  ];

  const dernieresCommandes = [
    { id: "CMD-2024-001", client: "Martin Dupont", montant: "890 €", statut: "En cours" },
    { id: "CMD-2024-002", client: "Julie Martin", montant: "1 200 €", statut: "Expédiée" },
    { id: "CMD-2024-003", client: "Paul Durand", montant: "450 €", statut: "En attente" },
    { id: "CMD-2024-004", client: "Sophie Bernard", montant: "2 100 €", statut: "Livrée" }
  ];

  const ventesParCategorie = [
    { categorie: "Informatique", montant: "15 780 €", pourcentage: 35 },
    { categorie: "Téléphonie", montant: "12 450 €", pourcentage: 28 },
    { categorie: "Accessoires", montant: "9 890 €", pourcentage: 22 },
    { categorie: "Périphériques", montant: "6 770 €", pourcentage: 15 }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statsGlobales.map((stat) => (
          <Card key={stat.titre}>
            <div className="text-center p-4">
              <h3 className="text-gray-500">{stat.titre}</h3>
              <p className="text-3xl font-bold">{stat.valeur}</p>
              <span className={`text-sm ${stat.evolution.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.evolution}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold mb-4">Dernières commandes</h3>
          <div className="space-y-4">
            {dernieresCommandes.map((commande) => (
              <div key={commande.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{commande.client}</p>
                  <p className="text-sm text-gray-500">{commande.id}</p>
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
          </div>
        </Card>

        <Card>
          <h3 className="font-bold mb-4">Ventes par catégorie</h3>
          <div className="space-y-4">
            {ventesParCategorie.map((categorie) => (
              <div key={categorie.categorie} className="space-y-2">
                <div className="flex justify-between">
                  <span>{categorie.categorie}</span>
                  <span className="font-bold">{categorie.montant}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${categorie.pourcentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}