import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHome, FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductDetail({ getProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id, getProduct]);

  const handleBack = () => navigate("/");

  /* ──────────────────────────────────────────────── LOADING UI ──────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent animate-spin rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────── PRODUCTO NO ENCONTRADO ─────────────────────────────────────────── */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingCart className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El producto que buscas no está disponible.
          </p>

          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-3 mx-auto shadow"
          >
            <FaHome />
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────── DETALLE ──────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Botón de volver */}
        <button
          onClick={handleBack}
          className="mb-8 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-sm hover:bg-gray-100 transition flex items-center gap-3 font-medium text-gray-700"
        >
          <FaArrowLeft />
          Volver al catálogo
        </button>

        {/* Card principal */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGEN */}
          <div className="p-10 bg-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-h-[500px] object-contain rounded-xl bg-white shadow-md"
            />
          </div>

          {/* INFO */}
          <div className="p-10">

            {/* Category */}
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold mb-4">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(num => (
                  <FaStar key={num} />
                ))}
              </div>
              <span className="text-gray-600 text-sm">(4.8)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-green-600 mt-4">
              ${product.price}
            </p>

            {/* Stock */}
            {product.stock !== undefined && (
              <p
                className={`mt-1 text-sm font-semibold ${
                  product.stock > 10
                    ? "text-green-600"
                    : product.stock > 0
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 10
                  ? "✓ En stock"
                  : product.stock > 0
                  ? `⚠ Solo ${product.stock} disponibles`
                  : "✗ Agotado"}
              </p>
            )}

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Descripción
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 flex-1 shadow"
              >
                <FaShoppingCart />
                Agregar al carrito
              </button>

              <button
                onClick={handleBack}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3 flex-1"
              >
                <FaHome />
                Seguir comprando
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
