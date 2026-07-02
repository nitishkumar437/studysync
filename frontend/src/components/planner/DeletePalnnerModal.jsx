import { Trash2 } from "lucide-react";

const DeletePlannerModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={40} className="text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          Delete Study Session
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Are you sure you want to delete this study session?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlannerModal;
