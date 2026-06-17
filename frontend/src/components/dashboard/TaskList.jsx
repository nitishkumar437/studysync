const TaskList = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100  ">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Today's Tasks</h2>

        <button className="text-indigo-500 font-medium">+ New</button>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <h3 className="font-semibold text-lg">
            Review Discrete Math Lecture
          </h3>

          <div className="flex gap-3 mt-2">
            <span className="bg-red-100 text-red-500 px-2 py-1 rounded-lg text-xs">
              HIGH
            </span>

            <span className="text-gray-500">2:00 PM</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Finish Chemistry Lab Report</h3>

          <div className="flex gap-3 mt-2">
            <span className="bg-indigo-100 text-indigo-500 px-2 py-1 rounded-lg text-xs">
              NORMAL
            </span>

            <span className="text-gray-500">5:30 PM</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Read Chapter 4 — Algorithms</h3>

          <div className="flex gap-3 mt-2">
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs">
              LOW
            </span>

            <span className="text-gray-500">7:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
