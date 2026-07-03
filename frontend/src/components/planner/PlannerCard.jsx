import React from "react";
import {
  CalendarDays,
  Clock3,
  Circle,
  CheckCircle2,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";

const priorityStyles = {
  High: {
    badge: "bg-red-100 text-red-600",
    border: "border-l-red-500",
  },
  Medium: {
    badge: "bg-orange-100 text-orange-600",
    border: "border-l-orange-500",
  },
  Low: {
    badge: "bg-green-100 text-green-600",
    border: "border-l-green-500",
  },
};

const PlannerCard = ({ planner, onEdit, onDelete, onToggleStatus }) => {
  const isCompleted = planner.status === "Completed";

  const priority = priorityStyles[planner.priority] || {
    badge: "bg-gray-100 text-gray-600",
    border: "border-l-gray-300",
  };

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border
        border-gray-100
        border-l-4
        ${priority.border}
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-5
        md:p-7
      `}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
     
        <div className="flex gap-4 flex-1">
          <button
            onClick={() => onToggleStatus(planner)}
            className="mt-1 hover:scale-110 transition"
          >
            {isCompleted ? (
              <CheckCircle2 size={26} className="text-green-500" />
            ) : (
              <Circle size={26} className="text-indigo-500" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                <BookOpen size={14} />
                {planner.subject}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.badge}`}
              >
                {planner.priority}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {planner.status}
              </span>
            </div>

            <h2
              className={`text-xl md:text-2xl font-bold   ${
                isCompleted ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              {planner.title}
            </h2>

            {planner.description && (
              <p className="text-gray-500 mt-3 line-clamp-2">
                {planner.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {new Date(planner.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} />
                {planner.startTime} - {planner.endTime}
              </div>
            </div>
          </div>
        </div>

 
        <div className="flex lg:flex-col justify-end gap-3">
          <button
            onClick={() => onEdit(planner)}
            className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              hover:bg-blue-100
              transition
              flex
              items-center
              justify-center
            "
          >
            <Pencil size={18} className="text-blue-600" />
          </button>

          <button
            onClick={() => onDelete(planner._id)}
            className="
              w-11
              h-11
              rounded-xl
              bg-red-50
              hover:bg-red-100
              transition
              flex
              items-center
              justify-center
            "
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlannerCard);
