import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-purple-600 p-14 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to boost your productivity?
          </h2>

          <p className="mt-6 text-lg text-indigo-100">
            Join StudySync today and organize your academic life in one place.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-10 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
