import { AlertTriangle, Loader2 } from "lucide-react";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={42} className="text-red-600" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>

          <p className="mt-3 text-gray-500 leading-relaxed">{message}</p>

          <div className="flex gap-4 w-full mt-8">
            <button
              onClick={onClose}
              disabled={loading}
              className="
              flex-1
              py-3
              rounded-xl
              border
              border-gray-300
              font-semibold
              hover:bg-gray-100
              transition
              disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="
              flex-1
              py-3
              rounded-xl
              bg-red-600
              text-white
              font-semibold
              hover:bg-red-700
              transition
              disabled:opacity-50
              flex
              justify-center
              items-center
              gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
