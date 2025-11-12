import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function DeleteProductModal({ product, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/master/product/delete/${product.product_id}`);
      onSuccess(product.product_id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-4 text-red-600">
          Confirm Delete
        </h3>
        <p>
          Are you sure you want to delete{" "}
          <b>{product.product_name}</b>?
        </p>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
