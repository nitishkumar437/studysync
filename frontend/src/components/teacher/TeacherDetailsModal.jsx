import { X, UserCircle2, BookOpen } from "lucide-react";

const TeacherDetailsModal = ({ open, onClose, teacher }) => {
  if (!open || !teacher) return null;

  // Support both possible field names
  const assignedSubjects = teacher.subjects || teacher.assignedSubjects || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">Teacher Details</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Profile */}
          <div className="flex items-center gap-4 mb-8">
            {teacher.avatar ? (
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
                <UserCircle2 size={50} className="text-violet-600" />
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {teacher.name}
              </h3>

              <p className="text-gray-500">Teacher</p>
            </div>
          </div>

          {/* Teacher Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Email" value={teacher.email} />

            <Detail label="Phone" value={teacher.phone} />

            <Detail label="Qualification" value={teacher.qualification} />

            <Detail label="Experience" value={teacher.experience} />

            <Detail label="Gender" value={teacher.gender} />

            <Detail label="Address" value={teacher.address} />
          </div>

          {/* Assigned Subjects */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-violet-600" />

              <h3 className="text-lg font-bold text-gray-900">
                Assigned Subjects
              </h3>
            </div>

            {assignedSubjects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
                <p className="text-gray-500">No subjects assigned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assignedSubjects.map((subject, index) => {
                  const subjectName =
                    typeof subject === "string"
                      ? subject
                      : subject.name || subject.subjectName || "Subject";

                  const subjectCode =
                    typeof subject === "object"
                      ? subject.code || subject.subjectCode || ""
                      : "";

                  return (
                    <div
                      key={subject._id || subject.id || index}
                      className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                        <BookOpen size={20} className="text-violet-600" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {subjectName}
                        </p>

                        {subjectCode && (
                          <p className="text-xs text-gray-500">{subjectCode}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
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

    <p className="font-medium mt-1 text-gray-900">{value || "-"}</p>
  </div>
);

export default TeacherDetailsModal;
