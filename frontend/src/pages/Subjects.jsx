import { useEffect, useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import SubjectModal from "../components/subject/SubjectModal";
import SubjectDetailsModal from "../components/subject/SubjectDetailsModal";
import DeleteSubjectModal from "../components/subject/DeleteSubjectModal";

import { getSubjects } from "../services/subjectService";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("add");

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState(null);

  // Fetch Subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const data = await getSubjects();

      console.log("Subjects API Response:", data);

      setSubjects(data.subjects || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const filteredSubjects = subjects.filter((subject) => {
    const search = searchTerm.toLowerCase();

    return (
      subject.name?.toLowerCase().includes(search) ||
      subject.code?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subjects</h1>

            <p className="text-gray-500 mt-1">Manage all institute subjects.</p>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedSubject(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={20} />
            Add Subject
          </button>
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Subject</th>

                <th className="text-left p-4">Code</th>

                <th className="text-left p-4">Description</th>

                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    Loading subjects...
                  </td>
                </tr>
              ) : filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    {searchTerm
                      ? "No subject found."
                      : "No subjects available."}
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => (
                  <tr
                    key={subject._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Subject */}

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                          <BookOpen size={21} className="text-violet-600" />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {subject.name}
                          </p>

                          <p className="text-xs text-gray-500">Subject</p>
                        </div>
                      </div>
                    </td>

                    {/* Code */}

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                        {subject.code}
                      </span>
                    </td>

                    {/* Description */}

                    <td className="p-4 text-gray-600">
                      {subject.description || "-"}
                    </td>

                    {/* Actions */}

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}

                        <button
                          title="View Subject"
                          onClick={() => {
                            setSelectedSubject(subject);
                            setOpenViewModal(true);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit */}

                        <button
                          title="Edit Subject"
                          onClick={() => {
                            setMode("edit");
                            setSelectedSubject(subject);
                            setOpenModal(true);
                          }}
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-100 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}

                        <button
                          title="Delete Subject"
                          onClick={() => {
                            setSelectedSubject(subject);
                            setOpenDelete(true);
                          }}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add / Edit Subject Modal */}

        <SubjectModal
          open={openModal}
          mode={mode}
          subject={selectedSubject}
          onClose={() => {
            setOpenModal(false);
            setSelectedSubject(null);
          }}
          onSuccess={fetchSubjects}
        />

        {/* Subject Details */}

        <SubjectDetailsModal
          open={openViewModal}
          subject={selectedSubject}
          onClose={() => {
            setOpenViewModal(false);
            setSelectedSubject(null);
          }}
        />

        {/* Delete Subject */}

        <DeleteSubjectModal
          open={openDelete}
          subject={selectedSubject}
          onClose={() => {
            setOpenDelete(false);
            setSelectedSubject(null);
          }}
          onSuccess={fetchSubjects}
        />
      </div>
    </DashboardLayout>
  );
};

export default Subjects;
