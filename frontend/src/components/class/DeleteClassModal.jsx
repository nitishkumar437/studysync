import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import { deleteClass } from "../../services/classService";

const DeleteClassModal = ({ open, onClose, onSuccess, classData }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !classData) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteClass(classData._id);

      toast.success(response.message || "Class deleted successfully.");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Delete Class</h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}

        <div className="p-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 size={30} className="text-red-600" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 text-center mt-5">
            Are you sure?
          </h3>

          <p className="text-gray-500 text-center mt-2">
            You are about to delete
          </p>

          <p className="text-center font-semibold text-gray-900 mt-1">
            {classData.name}
          </p>

          {classData.sections?.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2 mt-3">
              {classData.sections.map((section) => (
                <span
                  key={section}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs"
                >
                  Section {section}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-red-500 text-center mt-5">
            This class will no longer appear in the class list.
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-3 rounded-xl border hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition disabled:opacity-70"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}

            {loading ? "Deleting..." : "Delete Class"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClassModal;
