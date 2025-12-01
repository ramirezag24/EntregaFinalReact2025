import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Función que limpia acentos, mayúsculas, caracteres raros
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "");
}

export default function SearchResults({ getProducts }) {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    getProducts().then((products) => {
      const q = normalizeText(query);

      const filtered = products.filter((p) => {
        const name = normalizeText(p.name);
        const desc = normalizeText(p.description || "");
        return name.includes(q) || desc.includes(q);
      });

      setResults(filtered);
    });
  }, [query, getProducts]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Resultados para: <span className="text-blue-600">{query}</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-green-600 text-lg font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
