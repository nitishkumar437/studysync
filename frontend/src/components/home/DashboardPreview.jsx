import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import dashboard from "../../assets/dashboard.png";

const DashboardPreview = () => {
  return (
    <section
      id="dashboard"
      className="py-24 bg-linear-to-b from-indigo-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Everything you need in
            <span className="text-indigo-600"> one dashboard.</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
            Stay productive with an intuitive dashboard that brings together
            your notes, tasks, planner and study progress in one place.
          </p>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl hover:shadow-3xl transition duration-300">
          <img src={dashboard} alt="StudySync Dashboard" className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900">
              Manage Everything
            </h3>

            <p className="mt-3 text-gray-600">
              Tasks, Notes, Planner and Profile are available in one beautiful
              workspace.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900">
              Real-time Progress
            </h3>

            <p className="mt-3 text-gray-600">
              Monitor completed tasks, pending work and notes instantly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900">
              Modern Experience
            </h3>

            <p className="mt-3 text-gray-600">
              Minimal design with a fast and responsive interface built for
              students.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/signup"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Try StudySync Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
