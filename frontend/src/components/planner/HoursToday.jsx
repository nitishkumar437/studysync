import { Clock3, BookOpen, CheckCircle2, Hourglass } from "lucide-react";

const HoursToday = ({ planners = [] }) => {
  const today = new Date().toISOString().split("T")[0];

  const todaySessions = planners.filter((planner) => {
    const plannerDate = new Date(planner.date).toISOString().split("T")[0];
    return plannerDate === today;
  });

  const calculateHours = (start, end) => {
    if (!start || !end) return 0;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return eh + em / 60 - (sh + sm / 60);
  };

  const totalHours = todaySessions.reduce(
    (sum, planner) => sum + calculateHours(planner.startTime, planner.endTime),
    0,
  );

  const completedHours = todaySessions
    .filter((planner) => planner.status === "Completed")
    .reduce(
      (sum, planner) =>
        sum + calculateHours(planner.startTime, planner.endTime),
      0,
    );

  const remainingHours = totalHours - completedHours;

  const completedSessions = todaySessions.filter(
    (planner) => planner.status === "Completed",
  ).length;

  const progress =
    totalHours === 0 ? 0 : Math.round((completedHours / totalHours) * 100);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
   

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hours Today</h2>

          <p className="text-gray-500 mt-1">Track today's study progress</p>
        </div>

        <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-semibold">
          {progress}%
        </div>
      </div>

    
      <div className="mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">
          {completedHours.toFixed(1)}

          <span className="text-xl md:text-2xl text-gray-400">
            {" "}
            / {totalHours.toFixed(1)}h
          </span>
        </h1>

        <p className="text-gray-500 mt-2">Completed Study Hours</p>
      </div>

     

      <div className="mt-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Progress</span>

          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-indigo-50 rounded-2xl p-5 text-center">
          <BookOpen size={26} className="mx-auto text-indigo-600" />

          <h3 className="text-3xl font-bold text-indigo-600 mt-3">
            {todaySessions.length}
          </h3>

          <p className="text-gray-600 mt-2 text-sm">Sessions</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 text-center">
          <CheckCircle2 size={26} className="mx-auto text-green-600" />

          <h3 className="text-3xl font-bold text-green-600 mt-3">
            {completedSessions}
          </h3>

          <p className="text-gray-600 mt-2 text-sm">Completed</p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5 text-center">
          <Hourglass size={26} className="mx-auto text-orange-600" />

          <h3 className="text-3xl font-bold text-orange-600 mt-3">
            {remainingHours.toFixed(1)}h
          </h3>

          <p className="text-gray-600 mt-2 text-sm">Remaining</p>
        </div>
      </div>
 

      {todaySessions.length === 0 && (
        <div className="mt-8 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <Clock3 size={40} className="mx-auto text-gray-300" />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Study Sessions Today
          </h3>

          <p className="text-gray-500 mt-2">
            Create a study session to start tracking your progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default HoursToday;
