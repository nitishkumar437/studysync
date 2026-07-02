import { BarChart3, TrendingUp } from "lucide-react";

const ProductivityChart = ({ weeklyData = [] }) => {
  const chartData =
    weeklyData.length > 0
      ? weeklyData
      : [
          { day: "Mon", completed: 0 },
          { day: "Tue", completed: 0 },
          { day: "Wed", completed: 0 },
          { day: "Thu", completed: 0 },
          { day: "Fri", completed: 0 },
          { day: "Sat", completed: 0 },
          { day: "Sun", completed: 0 },
        ];

  const maxCompleted = Math.max(...chartData.map((item) => item.completed), 1);

  const totalCompleted = chartData.reduce(
    (sum, item) => sum + item.completed,
    0,
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={24} />

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Weekly Productivity
            </h2>
          </div>

          <p className="text-gray-500 mt-2">
            Track completed tasks over the last 7 days.
          </p>
        </div>

        <div className="w-full sm:w-auto  bg-green-50 text-green-600 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} />

            <div>
              <p className="text-xl font-bold">{totalCompleted}</p>

              <p className="text-xs uppercase tracking-wide">Completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between h-56 sm:h-64 lg:h-72 sm:gap-2 lg:gap-3 gap-1">
          {chartData.map((item) => {
            const height =
              item.completed === 0
                ? 10
                : Math.max((item.completed / maxCompleted) * 220, 28);

            return (
              <div
                key={item.day}
                className="flex flex-col items-center flex-1 group"
              >
                <span className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 opacity-0 group-hover:opacity-100 transition">
                  {item.completed}
                </span>

                <div
                  className="
                  w-full
                  max-w-8
                  sm:max-w-10
                  lg:max-w-12
                  rounded-t-2xl
                  bg-linear-to-t
                  from-indigo-600
                  via-violet-500
                  to-purple-400
                  transition-all
                  duration-500
                  sm:hover:scale-105
                  "
                  style={{
                    height: `${height}px`,
                  }}
                ></div>

                <p className="mt-3 text-sm font-semibold text-gray-600">
                  {item.day}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
          Completed Tasks
        </div>

        <div>
          Highest :
          <span className="font-semibold text-gray-800 ml-1">
            {maxCompleted}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
