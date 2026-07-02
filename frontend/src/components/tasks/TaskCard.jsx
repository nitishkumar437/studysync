import React from "react";
import {
  Circle,
  CheckCircle2,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

const priorityColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
};

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityClass =
    priorityColors[task.priority] || "bg-gray-100 text-gray-600";

  const isCompleted = task.status === "Completed";

  return (
    <div
      className={`
  flex
  flex-col
  sm:flex-row
  sm:items-center
  sm:justify-between
  gap-5
  p-5
  transition-all
  duration-300
  border-b
  border-gray-100
  last:border-b-0
  
  ${isCompleted ? "bg-green-50" : "bg-white hover:bg-purple-50"}
`}
    >
      <div className="flex gap-4 flex-1">
        <button
          onClick={() => onToggleStatus(task)}
          className="mt-1 hover:scale-110 transition"
        >
          {isCompleted ? (
            <CheckCircle2 size={24} className="text-green-500" />
          ) : (
            <Circle size={24} className="text-purple-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg md:text-xl font-semibold  ${
              isCompleted ? "text-gray-400 line-through" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityClass}`}
            >
              {task.priority}
            </span>

            {isCompleted && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Completed
              </span>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <CalendarDays size={14} />

                {new Date(task.dueDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 sm:ml-4">
        <button
          onClick={() => onEdit(task)}
          className="
            w-10
            h-10
            rounded-xl
            bg-blue-50
            text-blue-600
            hover:bg-blue-100
            transition
          "
          title="Edit Task"
        >
          <Pencil size={18} className="mx-auto" />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="
            w-10
            h-10
            rounded-xl
            bg-red-50
            text-red-600
            hover:bg-red-100
            transition
          "
          title="Delete Task"
        >
          <Trash2 size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskCard);
