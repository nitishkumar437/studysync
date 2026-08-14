import StudentLayout from "../components/student/StudentLayout";

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Student Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Track your studies and assignments.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Subjects</h3>

            <p className="mt-3 text-3xl font-bold">6</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Assignments</h3>

            <p className="mt-3 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Tasks</h3>

            <p className="mt-3 text-3xl font-bold">7</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Study Hours</h3>

            <p className="mt-3 text-3xl font-bold">42</p>
          </div>
        </div>

        {/* Upcoming Tasks */}

        <div className="rounded-2xl bg-white border p-6">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Tasks</h2>

          <div className="space-y-4">
            <div className="border-b pb-3">
              Complete Mathematics assignment.
            </div>

            <div className="border-b pb-3">Prepare Physics notes.</div>

            <div>Revise Chemistry chapter.</div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
 