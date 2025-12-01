import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../Services/ProductService";
import ProductForm from "../components/ProductForm";
import ModalConfirmDelete from "../components/ModalConfirmDelete.jsx";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function AdminProducts() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  // NUEVO: modal eliminar
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  if (!user || user.rol !== "admin") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        No tienes permiso para acceder al panel de administración.
      </div>
    );
  }

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setFiltered(data);
    } catch {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, products]);

  // ABRIR MODAL
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setModalOpen(true);
  };

  // CONFIRMAR DELETE
  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      toast.success("Producto eliminado");
      setModalOpen(false);
      load();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Panel de administración</h2>

        <div className="mb-4 flex gap-3 items-center">
          <FaSearch />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="border p-2 rounded flex-1"
          />
        </div>

        <div className="mb-6">
          <ProductForm
            productToEdit={editing}
            onSaved={() => {
              load();
              setEditing(null);
            }}
          />
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="border p-3 rounded flex flex-col items-center">
                <img
                  src={p.image || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="h-36 object-contain mb-2"
                />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm mb-2">{p.category}</p>

                <div className="flex gap-2 mt-auto">
                  <button onClick={() => setEditing(p)} className="bg-yellow-500 px-3 py-1 rounded">
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => openDeleteModal(p)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <ModalConfirmDelete
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete?.name}
      />
    </div>
  );
}
