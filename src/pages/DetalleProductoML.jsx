import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function DetalleProductoML({ getProduct }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
 const navigate = useNavigate();
  const { addToCart } = useCart(); 

  useEffect(() => {
    getProduct(id).then((data) => setProduct(data));
  }, [id, getProduct]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl">

        {/* Imagen */}
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-xl bg-gray-100 p-4 shadow"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start">

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <p className="text-4xl font-bold text-green-600 mb-2">${product.price}</p>

          <p className="text-gray-700 text-lg mb-6">
            Stock disponible:{" "}
            <span className="font-semibold text-gray-900">{product.stock}</span>
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-4 mt-6">

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow transition">
              Comprar ahora
            </button>

            <button
              onClick={() => addToCart(product)} 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-4 rounded-xl font-semibold text-lg shadow transition"
            >
              Agregar al carrito
            </button>
            <button
         onClick={() => navigate("/")}
        className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
        >
        ← Volver al inicio
        </button>

          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Descripción del producto
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {product.description}
        </p>
      </div>
    </div>
  );
}

