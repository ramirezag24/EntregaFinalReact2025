import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AuthProvider from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 
import './index.css';
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider> {/* Asegúrate de que esté aquí */}
         <SearchProvider>
          <App />
        </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);