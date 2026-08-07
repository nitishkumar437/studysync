import { Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteStudent } from "../../services/studentService";

const DeleteStudentModal = ({ open, onClose, student, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !student) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteStudent(student._id);

      toast.success(res.message);

      onClose();

      onSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 size={22} className="text-red-600" />
            </div>

            <h2 className="text-xl font-bold">Delete Student</h2>
          </div>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">
          <p className="text-gray-600 leading-7">
            Are you sure you want to delete
            <span className="font-semibold"> {student.name}</span>?
          </p>

          <p className="text-sm text-red-500 mt-3">
            This action can be restored later because we use soft delete.
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-3 border rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}

            {loading ? "Deleting..." : "Delete Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;
