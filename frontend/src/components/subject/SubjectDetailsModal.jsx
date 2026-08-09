import { X, BookOpen } from "lucide-react";

const SubjectDetailsModal = ({ open, onClose, subject }) => {
  if (!open || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
              <BookOpen size={23} className="text-violet-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Subject Details
              </h2>

              <p className="text-sm text-gray-500">View subject information</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Details */}

        <div className="p-6 space-y-5">
          {/* Subject Name */}

          <div>
            <p className="text-sm text-gray-500">Subject Name</p>

            <p className="text-lg font-semibold text-gray-900 mt-1">
              {subject.name || "-"}
            </p>
          </div>

          {/* Code */}

          <div>
            <p className="text-sm text-gray-500">Subject Code</p>

            <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-violet-100 text-violet-700 font-medium">
              {subject.code || "-"}
            </span>
          </div>

          {/* Description */}

          <div>
            <p className="text-sm text-gray-500">Description</p>

            <p className="text-gray-700 mt-1 leading-relaxed">
              {subject.description || "No description available."}
            </p>
          </div>

          {/* Created At */}

          <div>
            <p className="text-sm text-gray-500">Created At</p>

            <p className="text-gray-900 mt-1">
              {subject.createdAt
                ? new Date(subject.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailsModal;
