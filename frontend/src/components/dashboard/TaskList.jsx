import { Link } from "react-router-dom";
import { CalendarDays, Circle, CheckCircle2, ArrowRight } from "lucide-react";

const priorityStyles = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
};

const TaskList = ({ tasks = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 md:p-8 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Today's Tasks
          </h2>

          <p className="text-gray-500 mt-1">Your pending tasks for today</p>
        </div>

        <Link
          to="/tasks"
          className="
shrink-0
flex
items-center
gap-1
text-sm
text-indigo-600 font-semibold hover:text-indigo-700
"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={42} className="text-green-500" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              All Done 🎉
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              You don't have any pending tasks today.
            </p>
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => {
            const completed = task.status === "Completed";

            return (
              <div
                key={task._id}
                className="
                flex
                items-start
                gap-4
                p-4
                rounded-2xl
                border
                border-gray-100
                hover:border-indigo-200
                hover:bg-indigo-50/40
                transition-all
                "
              >
                <div className="mt-1">
                  {completed ? (
                    <CheckCircle2 size={22} className="text-green-500" />
                  ) : (
                    <Circle size={22} className="text-indigo-500" />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg ${
                      completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        priorityStyles[task.priority] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {task.priority}
                    </span>

                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CalendarDays size={15} />

                        {new Date(task.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskList;
