import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Home({ products }) {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");

  const filteredProducts = (products || []).filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 border rounded-xl shadow-sm 
                   focus:outline-none focus:border-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}
