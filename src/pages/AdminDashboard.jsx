// pages/AdminDashboard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBox, FaUsers, FaChartBar, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.rol !== "admin") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        No tienes permiso para acceder al panel de administración.
      </div>
    );
  }

  const adminCards = [
    {
      title: "Gestionar Productos",
      description: "Crear, editar y eliminar productos",
      icon: <FaBox className="text-3xl" />,
      link: "/admin/products",
      color: "bg-blue-500"
    },
    {
      title: "Gestión de Usuarios",
      description: "Administrar usuarios y permisos",
      icon: <FaUsers className="text-3xl" />,
      link: "/admin/users",
      color: "bg-green-500"
    },
    {
      title: "Estadísticas",
      description: "Ver reportes y métricas",
      icon: <FaChartBar className="text-3xl" />,
      link: "/admin/analytics",
      color: "bg-purple-500"
    },
    {
      title: "Configuración",
      description: "Ajustes de la tienda",
      icon: <FaCog className="text-3xl" />,
      link: "/admin/settings",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Bienvenido, {user.email}. Gestiona tu tienda desde aquí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="block"
            >
              <div className={`${card.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  {card.icon}
                </div>
                <p className="text-blue-100">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Gestionar Productos
            </Link>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Ver Reportes
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}