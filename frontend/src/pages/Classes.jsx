import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  School,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import ClassModal from "../components/class/ClassModal";
import ClassDetailsModal from "../components/class/ClassDetailsModal";
import DeleteClassModal from "../components/class/DeleteClassModal";

import { getClasses } from "../services/classService";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("add");

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);

  // ======================================================
  // Fetch Classes
  // ======================================================

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const data = await getClasses();

      console.log("Classes API Response:", data);

      setClasses(data.classes || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Search
  // ======================================================

  const filteredClasses = classes.filter((classItem) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      classItem.name?.toLowerCase().includes(search) ||
      classItem.sections?.some((section) =>
        section.toLowerCase().includes(search),
      )
    );
  });

  // ======================================================
  // Render
  // ======================================================

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classes</h1>

            <p className="text-gray-500 mt-1">
              Manage institute classes and sections.
            </p>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedClass(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={20} />
            Add Class
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
              placeholder="Search class or section..."
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
                <th className="text-left p-4">Class</th>

                <th className="text-left p-4">Sections</th>

                <th className="text-center p-4">Total Sections</th>

                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    Loading classes...
                  </td>
                </tr>
              ) : filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-gray-500">
                    {searchTerm ? "No class found." : "No classes available."}
                  </td>
                </tr>
              ) : (
                filteredClasses.map((classItem) => (
                  <tr
                    key={classItem._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Class */}

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                          <School size={21} className="text-violet-600" />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {classItem.name}
                          </p>

                          <p className="text-xs text-gray-500">Class</p>
                        </div>
                      </div>
                    </td>

                    {/* Sections */}

                    <td className="p-4">
                      {classItem.sections?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {classItem.sections.map((section) => (
                            <span
                              key={section}
                              className="px-3 py-1 rounded-lg bg-violet-100 text-violet-700 text-sm font-medium"
                            >
                              {section}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No sections</span>
                      )}
                    </td>

                    {/* Total Sections */}

                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                        <Layers size={15} />
                        {classItem.sections?.length || 0}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}

                        <button
                          title="View Class"
                          onClick={() => {
                            setSelectedClass(classItem);
                            setOpenViewModal(true);
                          }}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit */}

                        <button
                          title="Edit Class"
                          onClick={() => {
                            setMode("edit");
                            setSelectedClass(classItem);
                            setOpenModal(true);
                          }}
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-100 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}

                        <button
                          title="Delete Class"
                          onClick={() => {
                            setSelectedClass(classItem);
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

        {/* Add / Edit Class Modal */}

        <ClassModal
          open={openModal}
          mode={mode}
          classData={selectedClass}
          onClose={() => {
            setOpenModal(false);
            setSelectedClass(null);
          }}
          onSuccess={fetchClasses}
        />

        {/* Class Details */}

        <ClassDetailsModal
          open={openViewModal}
          classData={selectedClass}
          onClose={() => {
            setOpenViewModal(false);
            setSelectedClass(null);
          }}
        />

        {/* Delete Class */}

        <DeleteClassModal
          open={openDelete}
          classData={selectedClass}
          onClose={() => {
            setOpenDelete(false);
            setSelectedClass(null);
          }}
          onSuccess={fetchClasses}
        />
      </div>
    </DashboardLayout>
  );
};

export default Classes;
