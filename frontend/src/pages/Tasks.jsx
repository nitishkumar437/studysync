import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TaskCard from "../components/tasks/TaskCard";
import TaskModal from "../components/tasks/TaskModal";
import DeleteModal from "../components/common/DeleteModal";
import { Search } from "lucide-react";
import {
  getTasks,
  deleteTask,
  toggleTaskStatus,
} from "../services/taskService";
const Tasks = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const fetchTasks = async () => {
    try {
      const data = await getTasks();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Active"
          ? task.status === "Pending"
          : task.status === "Completed";

    return matchesSearch && matchesFilter;
  });

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const openDeleteModal = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const data = await deleteTask(taskToDelete);

      if (data.success) {
        fetchTasks();
        setShowDeleteModal(false);
        setTaskToDelete(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleToggleStatus = async (task) => {
    try {
      const data = await toggleTaskStatus(task._id);

      if (data.success) {
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Organize, prioritize, and crush your to-do list.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTask(null);
            setIsModalOpen(true);
          }}
          className="
w-full
sm:w-auto
px-6
py-3
rounded-2xl
bg-linear-to-r
from-purple-600
to-violet-600
text-white
font-semibold
shadow-lg
hover:shadow-xl
hover:scale-105
transition-all
duration-300
"
        >
          + New Task
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
      w-full
      pl-11
      pr-4
      py-3
      rounded-2xl
      border
      border-gray-200
      outline-none
      focus:ring-2
      focus:ring-purple-500
      transition
    "
            />
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <button
              onClick={() => setFilter("All")}
              className={`
px-4
py-2
rounded-xl
text-sm
font-medium
transition
${
  filter === "All"
    ? "bg-purple-600 text-white"
    : "bg-gray-100 hover:bg-gray-200"
}
`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Active")}
              className={`px-4 py-2 rounded-xl text-sm
font-medium
transition ${
                filter === "Active"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("Done")}
              className={`px-4 py-2 rounded-xl text-sm
font-medium
transition ${
                filter === "Done"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-lg text-gray-500">Loading Tasks...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800">
                No Tasks Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first task to stay productive.
              </p>

              <button
                onClick={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
                className="
      mt-6
      px-6
      py-3
      rounded-xl
      bg-purple-600
      hover:bg-purple-700
      text-white
      font-medium
      transition
    "
              >
                + New Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        fetchTasks={fetchTasks}
        selectedTask={selectedTask}
      />
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </DashboardLayout>
  );
};

export default Tasks;
