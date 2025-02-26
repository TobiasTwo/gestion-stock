import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Ajout d'une vérification de l'état de l'authentification
  const isAuthenticated = !!user;

  // Ajout d'une redirection si non authentifié
  useEffect(() => {
    const publicPaths = ['/login'];
    if (!isAuthenticated && !publicPaths.includes(window.location.pathname)) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Vérifie si un utilisateur est déjà connecté via les cookies
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fonction de connexion
  const login = (userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 1 }); // Expire dans 1 jour
    setUser(userData);
    navigate("/"); // Redirige vers le Dashboard après connexion
  };

  // Fonction de déconnexion
  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
