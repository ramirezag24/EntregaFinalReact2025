import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, addQuantity, removeQuantity, removeFromCart } = useCart();

  if (!cart || cart.length === 0)
    return <p>Carrito vacío</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => addQuantity(item.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeQuantity(item.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                -
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="font-bold mt-4">
        Total: $
        {cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>
    </div>
  );
}
