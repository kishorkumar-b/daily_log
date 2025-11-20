import React from "react";

export default function PopupMessage({ show, message, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white px-6 py-5 rounded-xl shadow-xl w-80 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Message</h3>
        <p className="text-gray-600 mb-5">{message}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
