// UserDetailsPanel.jsx
import React from "react";

export default function UserDetailsPanel() {
  return (
    <div className="w-1/2 ml-2 p-4 flex flex-col border border-gray-100 rounded space-y-2">
      <div className="flex gap-2">
        <label className="flex-1 py-1 text-blue-800 text-xs font-bold">
          Created By
        </label>
        <label className="flex-1 py-1 text-gray-900 text-xs font-bold">
          Administrator
        </label>
      </div>

      <div className="flex gap-2">
        <label className="flex-1 py-1 text-blue-800 text-xs font-bold">
          Created On
        </label>
        <label className="flex-1 py-1 text-gray-900 text-xs font-bold">
          2025-09-30 14:15:40
        </label>
      </div>

      <div className="flex gap-2">
        <label className="flex-1 py-1 text-blue-800 text-xs font-bold">
          Modified By
        </label>
        <label className="flex-1 py-1 text-gray-900 text-xs font-bold"></label>
      </div>

      <div className="flex gap-2">
        <label className="flex-1 py-1 text-blue-800 text-xs font-bold">
          Modified On
        </label>
        <label className="flex-1 py-1 text-gray-900 text-xs font-bold"></label>
      </div>
    </div>
  );
}
