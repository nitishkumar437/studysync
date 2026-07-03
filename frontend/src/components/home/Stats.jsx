import { Users, BookOpen, CheckCircle2, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "100+",
    label: "Students",
  },
  {
    icon: BookOpen,
    value: "200+",
    label: "Notes Created",
  },
  {
    icon: CheckCircle2,
    value: "500+",
    label: "Tasks Completed",
  },
  {
    icon: Star,
    value: "4.2/5",
    label: "Student Rating",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                  <Icon size={30} />
                </div>

                <h2 className="mt-6 text-4xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-gray-500">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
