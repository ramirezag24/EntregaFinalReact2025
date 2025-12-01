import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../Services/ProductService";
import { toast } from "react-toastify";

export default function ProductForm({ productToEdit, onSaved }) {
  const emptyForm = {
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");

  // Cargar datos cuando se edita
  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || "",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        category: productToEdit.category || "",
        image: productToEdit.image || "",
        description: productToEdit.description || "",
      });

      setPreview(productToEdit.image || "");
    } else {
      setForm(emptyForm);
      setPreview("");
    }
  }, [productToEdit]);

  // Previsualización en vivo
  useEffect(() => {
    setPreview(form.image);
  }, [form.image]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // LIMPIAR FORMULARIO
  const handleClear = () => {
    setForm(emptyForm);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Nombre obligatorio");
    if (Number(form.price) <= 0) return toast.error("Precio debe ser > 0");
    if (form.description.length < 10)
      return toast.error("Descripción mínima de 10 caracteres");

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, form);
        toast.success("Producto actualizado");
      } else {
        await createProduct(form);
        toast.success("Producto creado");
        handleClear(); // limpiar después de crear
      }

      onSaved();
    } catch {
      toast.error("Error al guardar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-4 border"
    >
      <h3 className="text-xl font-semibold">Agregar / Editar Producto</h3>

      {/* Previsualización de imagen */}
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-contain border mx-auto rounded"
        />
      ) : (
        <div className="w-32 h-32 mx-auto border flex items-center justify-center text-gray-500 rounded">
          Sin imagen
        </div>
      )}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border p-2 rounded"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        placeholder="Precio"
        className="w-full border p-2 rounded"
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        type="number"
        placeholder="Stock"
        className="w-full border p-2 rounded"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full border p-2 rounded"
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="URL de Imagen"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        rows={3}
        className="w-full border p-2 rounded resize-none"
      />

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded"
        >
          Limpiar
        </button>

        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {productToEdit ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
