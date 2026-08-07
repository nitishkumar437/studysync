import { X, UserCircle2 } from "lucide-react";

const TeacherDetailsModal = ({ open, onClose, teacher }) => {
  if (!open || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Teacher Details</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            {teacher.avatar ? (
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
                <UserCircle2 size={50} className="text-violet-600" />
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold">{teacher.name}</h3>

              <p className="text-gray-500">Teacher</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Detail label="Email" value={teacher.email} />

            <Detail label="Phone" value={teacher.phone} />

            <Detail label="Qualification" value={teacher.qualification} />

            <Detail label="Experience" value={teacher.experience} />

            <Detail label="Gender" value={teacher.gender} />

            <Detail label="Address" value={teacher.address} />
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>

    <p className="font-medium mt-1">{value || "-"}</p>
  </div>
);

export default TeacherDetailsModal;
