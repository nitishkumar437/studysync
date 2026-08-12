import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { updateStudent } from "../../services/studentService";
import { getClasses } from "../../services/classService";

const EditStudentModal = ({ open, onClose, student, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classes, setClasses] = useState([]);

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

  // ======================================================
  // Load Classes
  // ======================================================

  useEffect(() => {
    if (open) {
      fetchClasses();
    }
  }, [open]);

  const fetchClasses = async () => {
    try {
      setClassesLoading(true);

      const data = await getClasses();

      setClasses(data.classes || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load classes.");
    } finally {
      setClassesLoading(false);
    }
  };

  // ======================================================
  // Fill Student Data
  // ======================================================

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

  // ======================================================
  // Selected Class
  // ======================================================

  const selectedClass = classes.find(
    (item) => item.name === formData.className,
  );

  const sections = selectedClass?.sections || [];

  // ======================================================
  // Handle Change
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Class changed
    if (name === "className") {
      setFormData((prev) => ({
        ...prev,
        className: value,
        section: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // Submit
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.rollNumber ||
      !formData.className
    ) {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      const res = await updateStudent(student._id, formData);

      toast.success(res.message || "Student updated successfully.");

      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Edit Student</h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Student Name */}

            <div>
              <label className="font-medium">Student Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />
            </div>

            {/* Class */}

            <div>
              <label className="font-medium">Class</label>

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                disabled={loading || classesLoading}
                className="w-full mt-2 border rounded-xl px-4 py-3 bg-white disabled:bg-gray-100"
              >
                <option value="">
                  {classesLoading ? "Loading classes..." : "Select Class"}
                </option>

                {classes.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}

            <div>
              <label className="font-medium">Section</label>

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                disabled={
                  loading ||
                  classesLoading ||
                  !formData.className ||
                  sections.length === 0
                }
                className="w-full mt-2 border rounded-xl px-4 py-3 bg-white disabled:bg-gray-100"
              >
                <option value="">
                  {!formData.className
                    ? "Select Class First"
                    : sections.length === 0
                      ? "No Section Available"
                      : "Select Section"}
                </option>

                {sections.map((section) => (
                  <option key={section} value={section}>
                    Section {section}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}

            <div>
              <label className="font-medium">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 mt-8 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl border hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || classesLoading}
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
