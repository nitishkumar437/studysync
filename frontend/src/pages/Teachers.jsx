import { useEffect, useState } from "react";
import {
  Plus,
  BookOpen,
  Search,
  Eye,
  Pencil,
  UserCircle2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import TeacherModal from "../components/teacher/TeacherModal";
import TeacherDetailsModal from "../components/teacher/TeacherDetailsModal";
import { getTeachers } from "../services/teacherService";
import DeleteTeacherModal from "../components/teacher/DeleteTeacherModal";
import AssignSubjectModal from "../components/teacher/AssignSubjectModal";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [openAssignSubject, setOpenAssignSubject] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const data = await getTeachers();

      console.log("Teachers API Response:", data);

      setTeachers(data.teachers || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>

            <p className="text-gray-500 mt-1">Manage all institute teachers.</p>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedTeacher(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={20} />
            Add Teacher
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search teacher..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Teacher</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    Loading teachers...
                  </td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    No teacher found.
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {teacher.avatar ? (
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
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
                            {teacher.name}
                          </p>

                          <p className="text-xs text-gray-500">Teacher</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">{teacher.email}</td>

                    <td className="p-4">{teacher.phone || "-"}</td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="View Teacher"
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setOpenViewModal(true);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          title="Edit Teacher"
                          onClick={() => {
                            setMode("edit");
                            setSelectedTeacher(teacher);
                            setOpenModal(true);
                          }}
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-100 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          title="Assign Subjects"
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setOpenAssignSubject(true);
                          }}
                          className="p-2 rounded-lg text-violet-600 hover:bg-violet-100 transition"
                        >
                          <BookOpen size={18} />
                        </button>
                        <button
                          title="Delete Teacher"
                          onClick={() => {
                            setSelectedTeacher(teacher);
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

        <TeacherModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedTeacher(null);
          }}
          onSuccess={fetchTeachers}
          mode={mode}
          teacher={selectedTeacher}
        />

        <TeacherDetailsModal
          open={openViewModal}
          teacher={selectedTeacher}
          onClose={() => {
            setOpenViewModal(false);
            setSelectedTeacher(null);
          }}
        />

        <AssignSubjectModal
          open={openAssignSubject}
          teacher={selectedTeacher}
          onClose={() => {
            setOpenAssignSubject(false);
            setSelectedTeacher(null);
          }}
          onSuccess={fetchTeachers}
        />

        <DeleteTeacherModal
          open={openDelete}
          teacher={selectedTeacher}
          onClose={() => {
            setOpenDelete(false);
            setSelectedTeacher(null);
          }}
          onSuccess={fetchTeachers}
        />
      </div>
    </DashboardLayout>
  );
};

export default Teachers;
