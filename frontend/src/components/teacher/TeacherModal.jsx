import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { createTeacher, updateTeacher } from "../../services/teacherService";

const TeacherModal = ({
  open,
  onClose,
  onSuccess,
  mode = "add",
  teacher = null,
}) => {
  const [loading, setLoading] = useState(false);

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    qualification: "",
    experience: "",
    gender: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const resetForm = () => {
    setFormData(initialForm);
  };

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && teacher) {
      setFormData({
        name: teacher.name || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        password: "",
        qualification: teacher.qualification || "",
        experience: teacher.experience || "",
        gender: teacher.gender || "",
        address: teacher.address || "",
      });
    } else {
      resetForm();
    }
  }, [open, mode, teacher]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Teacher name is required.");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required.");
    }

    if (!formData.phone.trim()) {
      return toast.error("Phone number is required.");
    }

    if (mode === "add" && !formData.password.trim()) {
      return toast.error("Password is required.");
    }

    try {
      setLoading(true);

      let response;

      if (mode === "add") {
        response = await createTeacher(formData);
      } else {
        response = await updateTeacher(teacher._id, formData);
      }

      toast.success(
        response.message ||
          (mode === "add"
            ? "Teacher created successfully."
            : "Teacher updated successfully."),
      );

      resetForm();

      onClose();

      onSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Add Teacher" : "Edit Teacher"}
          </h2>

          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="font-medium">
                Teacher Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium">
                Phone <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>

            {/* Password (Only Add Mode) */}
            {mode === "add" && (
              <div>
                <label className="font-medium">
                  Password <span className="text-red-500">*</span>
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
                />
              </div>
            )}

            {/* Qualification */}
            <div>
              <label className="font-medium">Qualification</label>

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="font-medium">Experience</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="font-medium">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="font-medium">Address</label>

              <textarea
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading
                ? mode === "add"
                  ? "Creating..."
                  : "Updating..."
                : mode === "add"
                  ? "Save Teacher"
                  : "Update Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
