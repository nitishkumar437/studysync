import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";
import { getTeachers } from "../services/teacherService";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();

      setTeachers(data.teachers);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>

          <p className="text-gray-500 mt-1">Manage all institute teachers.</p>
        </div>

        <button
          className="
          flex
          items-center
          gap-2
          bg-violet-600
          hover:bg-violet-700
          text-white
          px-5
          py-3
          rounded-xl
          transition
        "
        >
          <Plus size={20} />
          Add Teacher
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
            placeholder="Search teacher..."
            className="
              w-full
              pl-11
              pr-4
              py-3
              border
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-violet-500
            "
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Name</th>
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
                <tr key={teacher._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{teacher.name}</td>

                  <td className="p-4">{teacher.email}</td>

                  <td className="p-4">{teacher.phone}</td>

                  <td className="p-4 text-center">Actions</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
