import TeacherLayout from "../components/teacher/TeacherLayout";

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Teacher Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your classes, students, notes and tasks.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Subjects</h3>

            <p className="mt-3 text-3xl font-bold">5</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Students</h3>

            <p className="mt-3 text-3xl font-bold">120</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Classes Today</h3>

            <p className="mt-3 text-3xl font-bold">4</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h3 className="text-sm text-gray-500">Pending Tasks</h3>

            <p className="mt-3 text-3xl font-bold">8</p>
          </div>
        </div>

        {/* Recent Activity */}

        <div className="rounded-2xl bg-white border p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            <div className="border-b pb-3">Mathematics notes uploaded.</div>

            <div className="border-b pb-3">Physics assignment created.</div>

            <div>Attendance updated.</div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
