import { CalendarDays, Clock3, BookOpen, CircleCheckBig } from "lucide-react";

const days = [
  { key: "Mon", label: "Monday" },
  { key: "Tue", label: "Tuesday" },
  { key: "Wed", label: "Wednesday" },
  { key: "Thu", label: "Thursday" },
  { key: "Fri", label: "Friday" },
  { key: "Sat", label: "Saturday" },
  { key: "Sun", label: "Sunday" },
];

const WeeklyTimetable = ({ planners = [] }) => {
  const getDay = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });

  const getPriority = (priority) => {
    switch (priority) {
      case "High":
        return {
          badge: "bg-red-100 text-red-600",
          dot: "bg-red-500",
        };

      case "Medium":
        return {
          badge: "bg-orange-100 text-orange-600",
          dot: "bg-orange-500",
        };

      case "Low":
        return {
          badge: "bg-green-100 text-green-600",
          dot: "bg-green-500",
        };

      default:
        return {
          badge: "bg-indigo-100 text-indigo-600",
          dot: "bg-indigo-500",
        };
    }
  };

  const visibleDays = days.filter((day) =>
    planners.some((planner) => getDay(planner.date) === day.key),
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-7">
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Weekly Timetable
        </h2>

        <p className="text-gray-500 mt-2">
          Plan and manage your weekly study sessions.
        </p>
      </div>

      {visibleDays.length === 0 ? (
        <div className="text-center py-16">
          <CalendarDays size={55} className="mx-auto text-gray-300 mb-4" />

          <h3 className="text-2xl font-semibold text-gray-700">
            No Study Sessions
          </h3>

          <p className="text-gray-500 mt-2">Create your first study session.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleDays.map((day) => {
            const sessions = planners.filter(
              (planner) => getDay(planner.date) === day.key,
            );

            return (
              <div
                key={day.key}
                className="border border-gray-100 rounded-3xl overflow-hidden"
              >
               

                <div className="bg-linear-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-indigo-700">
                    {day.label}
                  </h3>

                  <span className="text-sm font-medium text-gray-500">
                    {sessions.length} Session
                    {sessions.length > 1 ? "s" : ""}
                  </span>
                </div>
 

                <div className="p-5 space-y-4">
                  {sessions.map((planner) => {
                    const priority = getPriority(planner.priority);

                    return (
                      <div
                        key={planner._id}
                        className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Top */}

                        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                                <BookOpen size={15} />
                                {planner.subject}
                              </span>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.badge}`}
                              >
                                {planner.priority}
                              </span>

                              {planner.status === "Completed" && (
                                <span className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                                  <CircleCheckBig size={14} />
                                  Completed
                                </span>
                              )}
                            </div>

                            <h3
                              className={`text-xl font-bold ${
                                planner.status === "Completed"
                                  ? "text-gray-400 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              {planner.title}
                            </h3>

                            {planner.description && (
                              <p className="text-gray-500 mt-2">
                                {planner.description}
                              </p>
                            )}
                          </div>
                        </div>
 

                        <div className="flex flex-wrap gap-6 mt-5 text-gray-500 text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            {new Date(planner.date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock3 size={16} />
                            {planner.startTime} - {planner.endTime}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeeklyTimetable;
