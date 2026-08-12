import { useEffect, useState } from "react";
import { X, Loader2, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { createClass, updateClass } from "../../services/classService";

const ClassModal = ({
  open,
  onClose,
  onSuccess,
  mode = "add",
  classData = null,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sections: [],
  });

  const [sectionInput, setSectionInput] = useState("");

  // ======================================================
  // Fill Form
  // ======================================================

  useEffect(() => {
    if (mode === "edit" && classData) {
      setFormData({
        name: classData.name || "",
        sections: classData.sections || [],
      });
    } else {
      setFormData({
        name: "",
        sections: [],
      });
    }

    setSectionInput("");
  }, [mode, classData, open]);

  if (!open) return null;

  // ======================================================
  // Class Name Change
  // ======================================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // ======================================================
  // Add Section
  // ======================================================

  const handleAddSection = () => {
    const section = sectionInput.trim();

    if (!section) {
      return toast.error("Please enter a section.");
    }

    const alreadyExists = formData.sections.some(
      (item) => item.toLowerCase() === section.toLowerCase(),
    );

    if (alreadyExists) {
      return toast.error("This section already exists.");
    }

    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, section],
    }));

    setSectionInput("");
  };

  // ======================================================
  // Remove Section
  // ======================================================

  const handleRemoveSection = (sectionToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section !== sectionToRemove),
    }));
  };

  // ======================================================
  // Enter Key
  // ======================================================

  const handleSectionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSection();
    }
  };

  // ======================================================
  // Submit
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Class name is required.");
    }

    try {
      setLoading(true);

      let response;

      const data = {
        name: formData.name.trim(),
        sections: formData.sections,
      };

      if (mode === "edit" && classData?._id) {
        response = await updateClass(classData._id, data);
      } else {
        response = await createClass(data);
      }

      toast.success(
        response.message ||
          (mode === "edit"
            ? "Class updated successfully."
            : "Class created successfully."),
      );

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

  // ======================================================
  // Render
  // ======================================================

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "edit" ? "Edit Class" : "Add Class"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {mode === "edit"
                ? "Update class and section information."
                : "Create a new class with sections."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Class Name */}

            <div>
              <label className="font-medium text-gray-700">
                Class Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Class 10"
                disabled={loading}
                className="w-full mt-2 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
              />
            </div>

            {/* Sections */}

            <div>
              <label className="font-medium text-gray-700">Sections</label>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={sectionInput}
                  onChange={(e) => setSectionInput(e.target.value)}
                  onKeyDown={handleSectionKeyDown}
                  placeholder="e.g. A"
                  disabled={loading}
                  className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={handleAddSection}
                  disabled={loading}
                  className="px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition disabled:opacity-60"
                >
                  <Plus size={20} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Press Enter or click + to add a section.
              </p>
            </div>

            {/* Section List */}

            <div>
              {formData.sections.length === 0 ? (
                <div className="border border-dashed rounded-xl p-5 text-center">
                  <p className="text-sm text-gray-400">No sections added.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {formData.sections.map((section) => (
                    <div
                      key={section}
                      className="flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 px-3 py-2 rounded-xl"
                    >
                      <span className="font-medium">{section}</span>

                      <button
                        type="button"
                        onClick={() => handleRemoveSection(section)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl border hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-70"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Class"
                  : "Save Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassModal;
