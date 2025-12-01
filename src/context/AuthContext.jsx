// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      console.log("🔐 Attempting login with:", email);
      
      // Opción 1: Si tienes users.json en public
      const response = await fetch('/users.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const users = await response.json();
      console.log("📋 Users from JSON:", users);
      
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          rol: foundUser.rol
        };
        
        console.log("✅ Login successful:", userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      console.log("❌ Login failed: User not found or wrong password");
      return false;
      
    } catch (error) {
      console.error('Error en login:', error);
      
      // Opción 2: Usar datos hardcodeados como fallback
      console.log("🔄 Using fallback authentication...");
      const hardcodedUsers = [
        { id: "1", email: "admin", password: "1234", rol: "admin" },
        { id: "2", email: "client", password: "1234", rol: "client" }
      ];
      
      const foundUser = hardcodedUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          rol: foundUser.rol
        };
        
        console.log("✅ Login successful (fallback):", userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log("🔄 AuthContext loaded user from localStorage:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}