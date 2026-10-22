"use client";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Xóa", onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Đóng" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
          <i className="fa-solid fa-trash" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{message}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg border border-orange-200 font-semibold hover:bg-cream"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
