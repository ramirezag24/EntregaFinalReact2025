import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaCrown, FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (search.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">Mi Tienda</span>
          </Link>

          {/* Barra de búsqueda */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-gray-100 outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="text-gray-500 hover:text-blue-600 px-2"
            >
              <FaSearch />
            </button>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">

            {user?.rol === "admin" && (
              <Link
                to="/admin/products"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <FaCrown />
                <span className="hidden sm:inline">Panel administracion</span>
              </Link>
            )}

            {/* Carrito */}
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

            {/* Usuario */}
            {user ? (
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <span className="text-gray-700 hidden sm:block">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
