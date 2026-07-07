import { Star } from "lucide-react";
import nitish from "..//../assets/nitish.png";
const testimonials = [
  {
    name: "Rahul Kumar",
    course: "BCA Student",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "StudySync completely changed how I organize my notes and assignments. The dashboard is clean, fast and very easy to use.",
  },
  {
    name: "Priya Sharma",
    course: "B.Sc Student",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The task planner keeps me on track every day. I never miss deadlines anymore. Highly recommended for every student.",
  },
  {
    name: "Nitish Singh",
    course: "BCA Student",
    image: nitish,
    review:
      "Beautiful interface, responsive design and everything is organized in one place. This is exactly what students need.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-linear-to-b from-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Loved by
            <span className="text-indigo-600"> Students</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
            Students are using StudySync to stay productive and organized every
            day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="mt-6 text-gray-600 leading-7">"{item.review}"</p>

              <div className="flex items-center gap-4 mt-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 rounded-full object-cover object-top border-2 border-indigo-100 shadow-md"
                />

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>

                  <p className="text-gray-500 text-sm">{item.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
