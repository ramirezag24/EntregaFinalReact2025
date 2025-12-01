import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  console.log("🔐 AdminRoute - User:", user);
  console.log("🔐 AdminRoute - User rol:", user?.rol);

 
  if (user === undefined) {
    console.log("⏳ AdminRoute - Loading...");
    return <p>Cargando...</p>;
  }


  if (!user) {
    console.log("🚫 AdminRoute - No user, redirecting to login");
    return <Navigate to="/login" />;
  }

  
  if (user.rol !== "admin") {
    console.log("🚫 AdminRoute - Not admin, redirecting to home");
    return <Navigate to="/" />;
  }

 
  console.log("✅ AdminRoute - Access granted");
  return children;
}