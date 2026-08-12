import { X, School, Layers } from "lucide-react";

const ClassDetailsModal = ({ open, onClose, classData }) => {
  if (!open || !classData) return null;

  const sections = classData.sections || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
              <School size={23} className="text-violet-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">Class Details</h2>

              <p className="text-sm text-gray-500">View class information</p>
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

        <div className="p-6 space-y-6">
          {/* Class Name */}

          <div>
            <p className="text-sm text-gray-500">Class Name</p>

            <p className="text-xl font-bold text-gray-900 mt-1">
              {classData.name || "-"}
            </p>
          </div>

          {/* Total Sections */}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Layers size={20} className="text-gray-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Sections</p>

              <p className="font-semibold text-gray-900">{sections.length}</p>
            </div>
          </div>

          {/* Sections */}

          <div>
            <p className="text-sm text-gray-500 mb-3">Sections</p>

            {sections.length === 0 ? (
              <div className="border border-dashed rounded-xl p-5 text-center">
                <p className="text-gray-400">No sections added.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {sections.map((section) => (
                  <span
                    key={section}
                    className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold"
                  >
                    Section {section}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Created At */}

          <div>
            <p className="text-sm text-gray-500">Created At</p>

            <p className="text-gray-900 mt-1">
              {classData.createdAt
                ? new Date(classData.createdAt).toLocaleDateString("en-IN", {
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

export default ClassDetailsModal;
