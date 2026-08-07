import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { updateStudent } from "../../services/studentService";

const EditStudentModal = ({ open, onClose, student, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    className: "",
    section: "",
    gender: "",
    address: "",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        rollNumber: student.rollNumber || "",
        className: student.className || "",
        section: student.section || "",
        gender: student.gender || "",
        address: student.address || "",
        parentName: student.parentName || "",
        parentPhone: student.parentPhone || "",
      });
    }
  }, [student]);

  if (!open || !student) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await updateStudent(student._id, formData);

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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Edit Student</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Student Name */}

            <div>
              <label className="font-medium">Student Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Email */}

            <div>
              <label className="font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="font-medium">Phone</label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Roll Number */}

            <div>
              <label className="font-medium">Roll Number</label>

              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Class */}

            <div>
              <label className="font-medium">Class</label>

              <input
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Section */}

            <div>
              <label className="font-medium">Section</label>

              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>
            {/* Gender */}

            <div>
              <label className="font-medium">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Parent Name */}

            <div>
              <label className="font-medium">Parent Name</label>

              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Parent Phone */}

            <div>
              <label className="font-medium">Parent Phone</label>

              <input
                type="text"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Address */}

            <div className="col-span-2">
              <label className="font-medium">Address</label>

              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 mt-8 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
