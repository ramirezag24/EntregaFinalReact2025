import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";

const API_URL = "https://fakestoreapi.com/products";

const AppRoutes = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const requireAuth = (element) => (user ? element : <Navigate to="/login" />);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === product.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const addQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const removeQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={setUser} />}
          />

          <Route
            path="/"
            element={requireAuth(
              <Home
                products={products}
                addToCart={addToCart}
                cart={cart}
                user={user}
              />
            )}
          />

          <Route
            path="/producto/:id"
            element={requireAuth(
              <ProductDetail
                addToCart={addToCart}
                cart={cart}
                user={user}
              />
            )}
          />

          <Route
            path="/cart"
            element={requireAuth(
              <CartPage
                cartItems={cart}
                addQuantity={addQuantity}
                removeQuantity={removeQuantity}
                removeFromCart={removeFromCart}
              />
            )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
