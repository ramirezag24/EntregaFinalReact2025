import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <-- importa tu contexto

export default function ProductCard({ product }) {

  const { addToCart } = useCart(); // <-- obtener función del contexto

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg p-4 transition border border-gray-100">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain mb-4"
      />

      <h2 className="font-semibold text-gray-900 text-lg line-clamp-2">
        {product.title}
      </h2>

      <p className="text-primary font-bold text-xl mt-2">
        ${product.price}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {/* Botón PARA VER EL DETALLE */}
        <Link
          to={`/producto/${product.id}`}
          className="w-full text-center bg-primary text-white py-2 rounded-xl hover:bg-primaryDark transition"
        >
          Ver detalle
        </Link>

        {/* Botón AGREGAR AL CARRITO */}
        <button
          onClick={() => addToCart(product)}
          className="w-full border border-primary text-primary py-2 rounded-xl hover:bg-primary hover:text-white transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
