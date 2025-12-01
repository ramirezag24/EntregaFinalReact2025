import React from "react";

export default function ModalConfirmDelete({ open, onClose, onConfirm, itemName }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-96 animate-fadeIn">
        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          ¿Eliminar {itemName}?
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
