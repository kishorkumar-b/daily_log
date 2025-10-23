import React from "react";

export default function ColumnDropdown({ col, onClose }) {
  return (
    <div className="absolute top-full right-0 mt-1 bg-white border rounded shadow-lg z-50 w-32">
      <button
        className="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          alert(`Edit column: ${col.label}`);
          onClose();
        }}
      >
        ✏️ Edit
      </button>
      <button
        className="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          alert(`Hide column: ${col.label}`);
          onClose();
        }}
      >
        👁️ Hide
      </button>
      <button
        className="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          alert(`Sort column: ${col.label}`);
          onClose();
        }}
      >
        🔽 Sort
      </button>
    </div>
  );
}
