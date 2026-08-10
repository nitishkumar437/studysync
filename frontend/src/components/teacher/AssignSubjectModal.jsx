import { useEffect, useState } from "react";
import { X, Loader2, BookOpen, Check } from "lucide-react";
import toast from "react-hot-toast";

import { getSubjects } from "../../services/subjectService";
import { assignSubjectsToTeacher } from "../../services/teacherService";

const AssignSubjectModal = ({ open, onClose, onSuccess, teacher }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // Load subjects when modal opens
  useEffect(() => {
    if (open && teacher) {
      fetchSubjects();
    }
  }, [open, teacher]);

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);

      const data = await getSubjects();

      setSubjects(data.subjects || []);

      // Already assigned subjects
      const assignedIds =
        teacher.subjects?.map((subject) =>
          typeof subject === "string" ? subject : subject._id,
        ) || [];

      setSelectedSubjects(assignedIds);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // Toggle subject
  const handleToggleSubject = (subjectId) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subjectId)) {
        return prev.filter((id) => id !== subjectId);
      }

      return [...prev, subjectId];
    });
  };

  // Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await assignSubjectsToTeacher(
        teacher._id,
        selectedSubjects,
      );

      toast.success(response.message || "Subjects assigned successfully.");

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

  if (!open || !teacher) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Subjects</h2>

            <p className="text-sm text-gray-500 mt-1">
              Select subjects for{" "}
              <span className="font-medium text-gray-700">{teacher.name}</span>
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

        {/* Subject List */}

        <div className="p-6">
          {loadingSubjects ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 size={22} className="animate-spin mr-2" />
              Loading subjects...
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={40} className="mx-auto text-gray-300" />

              <p className="mt-3 text-gray-500">No subjects available.</p>

              <p className="text-sm text-gray-400 mt-1">
                Create a subject first.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {subjects.map((subject) => {
                const isSelected = selectedSubjects.includes(subject._id);

                return (
                  <button
                    type="button"
                    key={subject._id}
                    onClick={() => handleToggleSubject(subject._id)}
                    disabled={loading}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition ${
                      isSelected
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-violet-100" : "bg-gray-100"
                        }`}
                      >
                        <BookOpen
                          size={20}
                          className={
                            isSelected ? "text-violet-600" : "text-gray-500"
                          }
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {subject.name}
                        </p>

                        <p className="text-xs text-gray-500">{subject.code}</p>
                      </div>
                    </div>

                    {/* Checkbox */}

                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                        isSelected
                          ? "bg-violet-600 border-violet-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check size={16} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected Count */}

          {!loadingSubjects && subjects.length > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              {selectedSubjects.length}{" "}
              {selectedSubjects.length === 1 ? "subject" : "subjects"} selected
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-3 rounded-xl border hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || loadingSubjects || subjects.length === 0}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}

            {loading ? "Saving..." : "Save Subjects"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignSubjectModal;
