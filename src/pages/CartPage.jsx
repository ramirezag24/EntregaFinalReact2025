import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, addQuantity, removeQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, it) => acc + Number(it.price) * it.quantity, 0);

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      removeQuantity(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Título + Acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Tu Carrito</h1>

          {cart.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Seguir comprando
              </button>

              <button
                onClick={() => clearCart()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Vaciar
              </button>
            </div>
          )}
        </div>

        {/* Carrito vacío */}
        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-lg">
            <p className="text-xl font-semibold mb-4 text-gray-600">
              Tu carrito está vacío.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ir a comprar
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 last:border-b-0"
              >
                {/* Imagen */}
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name}
                  className="w-28 h-28 object-contain rounded-lg bg-gray-50 shadow-sm"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-lg">${item.price}</p>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => addQuantity(item.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>

                  <span className="font-semibold text-lg">{item.quantity}</span>

                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className={`px-4 py-2 rounded-lg transition ${
                      item.quantity === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center pt-4">
              <p className="font-bold text-2xl">Total: ${total.toFixed(2)}</p>
              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                Ir a pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
