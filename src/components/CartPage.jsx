import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Cart from "./Cart";

const CartPage = ({ cartItems, addQuantity, removeQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  return (
    <MainLayout cartItems={cartItems}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tu Carrito</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Volver a Productos
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-600 text-xl mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ir a Productos
          </button>
          
        </div>
      ) : (
        <Cart
          cartItems={cartItems}
          addQuantity={addQuantity}
          removeQuantity={removeQuantity}
          removeFromCart={removeFromCart}
        />
      )}
    </MainLayout>
  );
};

export default CartPage;
