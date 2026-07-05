import {
  NotebookPen,
  CheckSquare,
  CalendarDays,
  ChartNoAxesColumn,
  UserRound,
  Cloud,
} from "lucide-react";

const features = [
  {
    icon: NotebookPen,
    title: "Smart Notes",
    description: "Create, organize and search your study notes with ease.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Manage assignments and track your daily study progress.",
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
    description: "Plan your weekly schedule and never miss an important task.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Analytics",
    description:
      "Track your productivity with beautiful insights and statistics.",
  },
  {
    icon: UserRound,
    title: "Student Profile",
    description:
      "Manage your profile, goals and personal information securely.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Your data stays safe and accessible from anywhere, anytime.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-linear-to-b from-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6">
     

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Everything you need.
            <br />
            <span className="text-indigo-600">Nothing you don't.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            StudySync gives students everything they need to stay organized,
            productive and focused throughout the semester.
          </p>
        </div>

 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold mt-6 text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
