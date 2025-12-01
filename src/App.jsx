import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DetalleProductoML from "./pages/DetalleProductoML";


import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminProducts from "./pages/AdminProducts";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";

import AdminRoute from "./components/AdminRoute"; 
import AdminDashboard from "./pages/AdminDashboard";

import { getProducts, getProduct } from "./Services/ProductService";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      if (Array.isArray(data)) setProducts(data);
      else setProducts([]);
    });
  }, []);

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      {/* HOME */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home products={products} />
          </MainLayout>
        }
      />

     <Route
  path="/producto/:id"
  element={
    <MainLayout>
      <DetalleProductoML getProduct={getProduct} />
    </MainLayout>
  }
/>


      {/* CART */}
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />

      {/* ADMIN PROTECTED ROUTE */}
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminProducts />
            </MainLayout>
          </AdminRoute>
        }
      />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <MainLayout>
        <AdminDashboard />
      </MainLayout>
    </AdminRoute>
  }
/>



    </Routes>

    
  );
}
