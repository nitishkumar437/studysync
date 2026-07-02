import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createTask, updateTask } from "../../services/taskService";

const TaskModal = ({ isOpen, onClose, fetchTasks, selectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || "");
      setDescription(selectedTask.description || "");
      setPriority(selectedTask.priority || "Medium");

      if (selectedTask.dueDate) {
        setDueDate(new Date(selectedTask.dueDate).toISOString().slice(0, 16));
      }
    } else {
      resetForm();
    }
  }, [selectedTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        priority,
        dueDate,
      };

      const data = selectedTask
        ? await updateTask(selectedTask._id, payload)
        : await createTask(payload);

      if (data.success) {
        resetForm();
        onClose();
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {selectedTask ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Manage your study tasks efficiently.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            w-10
            h-10
            rounded-xl
            hover:bg-gray-100
            transition
            "
          >
            <X className="mx-auto" size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              focus:ring-4
              focus:ring-purple-100
              focus:border-purple-500
              transition
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write task description..."
              className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-4
              py-3
              resize-none
              outline-none
              focus:ring-4
              focus:ring-purple-100
              focus:border-purple-500
              transition
              "
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="
                w-full
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                outline-none
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
                transition
                "
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Due Date
              </label>

              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="
                w-full
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                outline-none
                focus:ring-4
                focus:ring-purple-100
                focus:border-purple-500
                transition
                "
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="
              px-6
              py-3
              rounded-xl
              border
              border-gray-200
              hover:bg-gray-100
              transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              px-6
              py-3
              rounded-xl
              bg-linear-to-r
              from-purple-600
              to-violet-600
              text-white
              font-semibold
              hover:shadow-lg
              disabled:opacity-60
              transition
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </span>
              ) : selectedTask ? (
                "Update Task"
              ) : (
                "Save Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
