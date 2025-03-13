import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card } from './components/ui/Card';

export default function LoginPage() {
  const { login } = useAuth();
  const [authType, setAuthType] = useState('email'); // Par défaut, le mode email est sélectionné
  const [step, setStep] = useState('credentials'); // Étape actuelle du processus de connexion: 'credentials' ou 'twoFactor'
  const [twoFactorMethod, setTwoFactorMethod] = useState(''); // 'otp' ou 'email'
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    otpCode: '',
    role: 'client' // Par défaut en mode client
  });

  // Vérifier les credentials et passer à l'étape d'authentification à deux facteurs
  const validateCredentials = (e) => {
    e.preventDefault();
    
    // Vérifier que les champs requis sont remplis
    if (!credentials.email || !credentials.password) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Simuler une validation des identifiants
    // Dans un cas réel, vous appelleriez ici votre API pour valider les identifiants
    
    // Si validation réussie, passer à l'étape de 2FA
    setStep('twoFactor');
    
    // Note: Ici vous pourriez appeler une API pour valider les identifiants
    // Par exemple:
    // validateCredentialsApi(credentials.email, credentials.password)
    //   .then(response => {
    //     if (response.success) {
    //       setStep('twoFactor');
    //     } else {
    //       alert("Identifiants incorrects");
    //     }
    //   })
    //   .catch(error => {
    //     alert("Erreur de connexion");
    //   });
  };

  // Soumission finale avec le code OTP
  const handleSubmitTwoFactor = (e) => {
    e.preventDefault();
    
    // Vérifier que l'utilisateur a entré un code OTP
    if (twoFactorMethod === 'otp' && !credentials.otpCode) {
      alert("Veuillez entrer le code OTP");
      return;
    }
    
    // Simuler une authentification avec les données appropriées selon le type d'auth
    login({
      id: 1,
      username: credentials.email,
      role: credentials.role,
      authType: authType,
      twoFactorMethod: twoFactorMethod
    });
    
    // Note: Ici vous pourriez appeler une API pour valider le code OTP
    // Par exemple:
    // validateOtpApi(credentials.email, credentials.otpCode)
    //   .then(response => {
    //     if (response.success) {
    //       login({
    //         id: response.userId,
    //         username: credentials.email,
    //         role: response.userRole,
    //         authType: authType,
    //         twoFactorMethod: twoFactorMethod
    //       });
    //     } else {
    //       alert("Code OTP incorrect");
    //     }
    //   })
    //   .catch(error => {
    //     alert("Erreur de validation du code OTP");
    //   });
  };

  // Sélectionner la méthode 2FA et simuler l'envoi d'un code
  const selectTwoFactorMethod = (method) => {
    setTwoFactorMethod(method);
    
    if (method === 'email') {
      // Simuler l'envoi d'un code par email
      alert(`Un code a été envoyé à ${credentials.email}`);
      
      // Note: Ici vous pourriez appeler une API pour envoyer un code par email
      // Par exemple:
      // sendEmailCodeApi(credentials.email)
      //   .then(response => {
      //     if (response.success) {
      //       alert(`Un code a été envoyé à ${credentials.email}`);
      //     } else {
      //       alert("Erreur lors de l'envoi du code");
      //     }
      //   })
      //   .catch(error => {
      //     alert("Erreur de connexion");
      //   });
    }
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

  // Fonction pour revenir à l'étape précédente
  const goBack = () => {
    setStep('credentials');
    setTwoFactorMethod('');
    setCredentials({
      ...credentials,
      otpCode: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        
        {step === 'credentials' ? (
          <form onSubmit={validateCredentials} className="space-y-4">
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
            >
              Continuer
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {!twoFactorMethod ? (
              <>
                <p className="text-center mb-4">Choisissez votre méthode d'authentification à deux facteurs</p>
                
                <button
                  onClick={() => selectTwoFactorMethod('otp')}
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 mb-2"
                >
                  Enter OTP code
                </button>
                
                <button
                  onClick={() => selectTwoFactorMethod('email')}
                  className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700"
                >
                  Email me a code
                </button>
                
                <button
                  onClick={goBack}
                  className="w-full bg-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-400 mt-4"
                >
                  Retour
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmitTwoFactor} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code de vérification</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={credentials.otpCode}
                    onChange={(e) => setCredentials({ ...credentials, otpCode: e.target.value })}
                    placeholder="Entrez le code reçu"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                >
                  Se connecter
                </button>
                
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full bg-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-400"
                >
                  Retour
                </button>
              </form>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}