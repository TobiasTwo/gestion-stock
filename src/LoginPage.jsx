import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card } from './components/ui/Card';

export default function LoginPage() {
  const { login } = useAuth();
  const [authType, setAuthType] = useState('email'); // Par défaut, le mode email est sélectionné
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    otpCode: '',
    role: 'client' // Par défaut en mode client
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que l'utilisateur a sélectionné un type d'authentification
    if (!authType) {
      alert("Veuillez sélectionner une méthode d'authentification");
      return;
    }
    
    // Simuler une authentification avec les données appropriées selon le type d'auth
    login({
      id: 1,
      username: credentials.email,
      role: credentials.role,
      authType: authType
    });
  };

  // Fonction pour lire une carte eID
  const handleReadEid = () => {
    setAuthType('eid');
    // Simuler la lecture d'une carte d'identité électronique
    alert("Lecture de la carte d'identité électronique en cours...");
    // Dans un cas réel, vous appelleriez ici votre API ou bibliothèque de lecture eID
    
    // Simuler des données obtenues
    setTimeout(() => {
      setCredentials({
        ...credentials,
        email: "utilisateur.eid@exemple.com",
        // Les autres données seraient extraites de la carte
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <button
              type="button"
              className={`flex-1 text-white rounded-md py-2 text-sm ${
                authType === 'otp' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => setAuthType('otp')}
            >
              OTP
            </button>
            <button
              type="button"
              className={`flex-1 text-white rounded-md py-2 text-sm ${
                authType === 'email' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => setAuthType('email')}
            >
              Email
            </button>
            <button
              type="button"
              className={`flex-1 text-white rounded-md py-2 text-sm ${
                authType === 'eid' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleReadEid}
            >
              eID
            </button>
          </div>
          
          {/* Champ email (affiché pour tous les types d'authentification) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              readOnly={authType === 'eid'} // En lecture seule si on utilise eID
            />
          </div>
          
          {/* Afficher le champ mot de passe uniquement pour l'authentification par email */}
          {authType === 'email' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          )}
          
          {/* Afficher le champ OTP uniquement pour l'authentification par OTP */}
          {authType === 'otp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Code OTP</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={credentials.otpCode}
                onChange={(e) => setCredentials({ ...credentials, otpCode: e.target.value })}
                placeholder="Entrez le code reçu par SMS"
              />
            </div>
          )}
          
          {/* Afficher un message pour eID */}
          {authType === 'eid' && (
            <div className="p-2 bg-gray-100 rounded-md text-sm text-gray-700">
              Vos informations ont été lues depuis votre carte d'identité électronique.
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </Card>
    </div>
  );
}