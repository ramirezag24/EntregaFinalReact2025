import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaCrown } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">Mi Tienda</span>
          </Link>

          {/* Navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Inicio
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            
            {user?.rol === "admin" && (
              <Link 
                to="/admin/products" 
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <FaCrown />
                <span className="hidden sm:inline">Panel de administración</span>
              </Link>
            )}

            <Link 
              to="/cart" 
              className="relative text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaShoppingCart className="text-lg" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span className="text-gray-700 hidden sm:block">{user.email}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Ingresar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}