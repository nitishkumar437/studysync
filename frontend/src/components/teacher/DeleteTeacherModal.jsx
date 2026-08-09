import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteTeacher } from "../../services/teacherService";

const DeleteTeacherModal = ({ open, onClose, teacher, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !teacher) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteTeacher(teacher._id);

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
        <div className="p-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <Trash2 className="text-red-600" size={32} />
          </div>

          <h2 className="text-2xl font-bold text-center mt-5">
            Delete Teacher
          </h2>

          <p className="text-gray-500 text-center mt-3">
            Are you sure you want to delete
          </p>

          <p className="text-center font-semibold text-lg mt-2">
            {teacher.name} ?
          </p>

          <p className="text-center text-red-500 text-sm mt-3">
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Deleting..." : "Delete Teacher"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeacherModal;
