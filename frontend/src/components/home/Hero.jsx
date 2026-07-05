import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import dashboard from "../../assets/dashboard.png";

const Hero = () => {
  return (
    <section className="bg-linear-to-b from-indigo-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex justify-center">
          <div className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
            🎓 Built for Students
          </div>
        </div>

        <h1 className="mt-8 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          Master your studies with
          <br />
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            StudySync
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-center text-lg text-gray-600 leading-8">
          Organize notes, manage tasks, plan your study schedule and boost your
          productivity—all in one beautiful workspace.
        </p>
        <div className="mt-10 flex items-center justify-center gap-5">
          <Link
            to="/signup"
            className="flex items-center gap-2 px-7 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
        <div
          id="dashboard"
          className="mt-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
        >
          <img
            src={dashboard}
            alt="StudySync Dashboard"
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
