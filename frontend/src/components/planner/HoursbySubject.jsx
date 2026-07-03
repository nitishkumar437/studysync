import { BookOpen, Clock3 } from "lucide-react";

const HoursBySubject = ({ planners = [] }) => {
  const calculateHours = (start, end) => {
    if (!start || !end) return 0;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return eh + em / 60 - (sh + sm / 60);
  };

  const subjectHours = {};

  planners.forEach((planner) => {
    const hours = calculateHours(planner.startTime, planner.endTime);

    subjectHours[planner.subject] =
      (subjectHours[planner.subject] || 0) + hours;
  });

  const subjects = Object.entries(subjectHours);

  const totalHours = subjects.reduce((sum, [, hours]) => sum + hours, 0);

  const maxHours =
    subjects.length > 0 ? Math.max(...subjects.map(([, hours]) => hours)) : 1;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hours By Subject</h2>

          <p className="text-gray-500 mt-1">Time spent on each subject</p>
        </div>

        <div className="flex gap-3">
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
            {subjects.length} Subjects
          </span>

          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
            {totalHours.toFixed(1)} hrs
          </span>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-14">
          <BookOpen size={45} className="mx-auto text-gray-300" />

          <h3 className="mt-4 text-xl font-semibold text-gray-700">
            No Study Sessions
          </h3>

          <p className="mt-2 text-gray-500">
            Add study sessions to see subject-wise progress.
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {subjects.map(([subject, hours]) => {
            const percentage = ((hours / totalHours) * 100).toFixed(0);

            return (
              <div
                key={subject}
                className="hover:bg-gray-50 rounded-2xl p-3 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <BookOpen size={20} className="text-indigo-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">{subject}</h3>

                      <p className="text-sm text-gray-500">
                        {percentage}% of total study time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-indigo-600 font-bold">
                    <Clock3 size={16} />
                    {hours.toFixed(1)} hrs
                  </div>
                </div>

                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-600 transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HoursBySubject;
