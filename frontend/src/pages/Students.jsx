import { useEffect, useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, UserCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import StudentModal from "../components/student/StudentModal";
import StudentDetailsModal from "../components/student/StudentDetailsModal";
import EditStudentModal from "../components/student/EditStudentModal";
import DeleteStudentModal from "../components/student/DeleteStudentModal";

import { getStudents } from "../services/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [openDetails, setOpenDetails] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudents();

      setStudents(data.students || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>

            <p className="text-gray-500 mt-1">Manage all institute students.</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={20} />
            Add Student
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
              placeholder="Search student..."
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
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Roll No</th>
                <th className="text-left p-4">Class</th>
                <th className="text-left p-4">Parent</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    No student found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Student */}

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                            <UserCircle2
                              size={24}
                              className="text-violet-600"
                            />
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-gray-900">
                            {student.name}
                          </p>

                          <p className="text-xs text-gray-500">Student</p>
                        </div>
                      </div>
                    </td>

                    {/* Roll */}

                    <td className="p-4">{student.rollNumber || "-"}</td>

                    {/* Class */}

                    <td className="p-4">
                      {student.className || "-"}{" "}
                      {student.section ? `(${student.section})` : ""}
                    </td>

                    {/* Parent */}

                    <td className="p-4">{student.parentName || "-"}</td>

                    {/* Phone */}

                    <td className="p-4">{student.phone || "-"}</td>

                    {/* Actions */}

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}

                        <button
                          title="View Student"
                          onClick={() => {
                            setSelectedStudent(student);
                            setOpenDetails(true);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit */}

                        <button
                          title="Edit Student"
                          onClick={() => {
                            setSelectedStudent(student);
                            setOpenEdit(true);
                          }}
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-100 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete Student"
                          onClick={() => {
                            setSelectedStudent(student);
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

        {/* Add Student Modal */}

        <StudentModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={fetchStudents}
        />
        <StudentDetailsModal
          open={openDetails}
          onClose={() => {
            setOpenDetails(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
        />

        <EditStudentModal
          open={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
          onSuccess={fetchStudents}
        />

        <DeleteStudentModal
          open={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
          onSuccess={fetchStudents}
        />
      </div>
    </DashboardLayout>
  );
};

export default Students;
