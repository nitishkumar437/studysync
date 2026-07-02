import { CheckCircle2, Circle, Clock3, BookOpen } from "lucide-react";

const TodayGoals = ({ planners = [] }) => {
  const today = new Date().toISOString().split("T")[0];

  const todayGoals = planners.filter((planner) => {
    const plannerDate = new Date(planner.date).toISOString().split("T")[0];
    return plannerDate === today;
  });

  const completed = todayGoals.filter(
    (planner) => planner.status === "Completed",
  ).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";

      case "Medium":
        return "bg-orange-100 text-orange-600";

      case "Low":
        return "bg-green-100 text-green-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 md:p-7 shadow-sm border border-gray-100">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Today's Goals
          </h2>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Complete today's study sessions
          </p>
        </div>

        <span
          className="
          self-start
          sm:self-auto
          bg-green-100
          text-green-600
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
        "
        >
          {completed}/{todayGoals.length} Done
        </span>
      </div>

      {/* Content */}

      <div className="mt-6 space-y-4">
        {todayGoals.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <BookOpen size={45} className="text-indigo-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No Study Sessions Today
            </h3>

            <p className="text-gray-500 mt-2">
              Enjoy your free time or create a new study session.
            </p>
          </div>
        ) : (
          todayGoals.map((planner) => (
            <div
              key={planner._id}
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
                rounded-2xl
                border
                border-gray-100
                p-5
                hover:bg-gray-50
                hover:shadow-md
                transition-all
                duration-300
              "
            >
             

              <div className="flex gap-4 flex-1">
                <div className="mt-1">
                  {planner.status === "Completed" ? (
                    <CheckCircle2 size={24} className="text-green-500" />
                  ) : (
                    <Circle size={24} className="text-indigo-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg md:text-xl font-semibold  ${
                      planner.status === "Completed"
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {planner.title}
                  </h3>

                  <p className="mt-2 text-gray-500 flex items-center gap-2">
                    <BookOpen size={16} />
                    {planner.subject}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <Clock3 size={15} />
                    {planner.startTime} - {planner.endTime}
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="flex md:flex-col items-start md:items-end gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                    planner.priority,
                  )}`}
                >
                  {planner.priority}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    planner.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {planner.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayGoals;
