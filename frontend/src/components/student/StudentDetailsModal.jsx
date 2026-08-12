import {
  X,
  UserCircle2,
  Mail,
  Phone,
  School,
  Users,
  Layers,
} from "lucide-react";

const StudentDetailsModal = ({ open, onClose, student }) => {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">Student Details</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          {/* Avatar */}

          <div className="flex flex-col items-center mb-8">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center">
                <UserCircle2 size={60} className="text-violet-600" />
              </div>
            )}

            <h3 className="text-2xl font-bold mt-4">{student.name}</h3>

            <p className="text-gray-500">Student</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Email */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <Mail size={18} />
                <span className="font-medium">Email</span>
              </div>

              <p className="text-gray-700 break-all">{student.email || "-"}</p>
            </div>

            {/* Phone */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <Phone size={18} />
                <span className="font-medium">Phone</span>
              </div>

              <p className="text-gray-700">{student.phone || "-"}</p>
            </div>

            {/* Roll Number */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <School size={18} />
                <span className="font-medium">Roll Number</span>
              </div>

              <p className="text-gray-700">{student.rollNumber || "-"}</p>
            </div>

            {/* Class */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <School size={18} />
                <span className="font-medium">Class</span>
              </div>

              <p className="text-gray-700">{student.className || "-"}</p>
            </div>

            {/* Section */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <Layers size={18} />
                <span className="font-medium">Section</span>
              </div>

              <p className="text-gray-700">
                {student.section ? `Section ${student.section}` : "-"}
              </p>
            </div>

            {/* Parent Name */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <Users size={18} />
                <span className="font-medium">Parent Name</span>
              </div>

              <p className="text-gray-700">{student.parentName || "-"}</p>
            </div>

            {/* Parent Phone */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <Phone size={18} />
                <span className="font-medium">Parent Phone</span>
              </div>

              <p className="text-gray-700">{student.parentPhone || "-"}</p>
            </div>

            {/* Gender */}

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <UserCircle2 size={18} />
                <span className="font-medium">Gender</span>
              </div>

              <p className="text-gray-700">{student.gender || "-"}</p>
            </div>

            {/* Address */}

            <div className="border rounded-xl p-4 col-span-2">
              <div className="flex items-center gap-2 text-violet-600 mb-2">
                <School size={18} />
                <span className="font-medium">Address</span>
              </div>

              <p className="text-gray-700 wrap-break-word">
                {student.address || "-"}
              </p>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end mt-8 border-t pt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
