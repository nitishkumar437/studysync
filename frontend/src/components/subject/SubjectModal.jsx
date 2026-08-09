import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { createSubject, updateSubject } from "../../services/subjectService";

const SubjectModal = ({
  open,
  onClose,
  onSuccess,
  mode = "add",
  subject = null,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  // Fill form when editing
  useEffect(() => {
    if (mode === "edit" && subject) {
      setFormData({
        name: subject.name || "",
        code: subject.code || "",
        description: subject.description || "",
      });
    } else {
      setFormData({
        name: "",
        code: "",
        description: "",
      });
    }
  }, [mode, subject, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.code.trim()) {
      return toast.error("Subject name and code are required.");
    }

    try {
      setLoading(true);

      let response;

      if (mode === "edit" && subject?._id) {
        response = await updateSubject(subject._id, formData);
      } else {
        response = await createSubject(formData);
      }

      toast.success(
        response.message ||
          (mode === "edit"
            ? "Subject updated successfully."
            : "Subject created successfully."),
      );

      resetForm();

      onClose();

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "edit" ? "Edit Subject" : "Add Subject"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {mode === "edit"
                ? "Update subject information."
                : "Add a new subject to your institute."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Subject Name */}

            <div>
              <label className="font-medium text-gray-700">
                Subject Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mathematics"
                disabled={loading}
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-500
                  disabled:bg-gray-100
                "
              />
            </div>

            {/* Subject Code */}

            <div>
              <label className="font-medium text-gray-700">
                Subject Code <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. MATH101"
                disabled={loading}
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  px-4
                  py-3
                  uppercase
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-500
                  disabled:bg-gray-100
                "
              />

              <p className="text-xs text-gray-500 mt-1">
                Subject code should be unique.
              </p>
            </div>

            {/* Description */}

            <div>
              <label className="font-medium text-gray-700">Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter subject description..."
                rows="4"
                disabled={loading}
                className="
                  w-full
                  mt-2
                  border
                  rounded-xl
                  px-4
                  py-3
                  resize-none
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-500
                  disabled:bg-gray-100
                "
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-3
                rounded-xl
                border
                hover:bg-gray-50
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-violet-600
                hover:bg-violet-700
                text-white
                px-6
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                transition
                disabled:opacity-70
              "
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Subject"
                  : "Save Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
