import { CheckSquare, FileText, CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "New Task",
    subtitle: "Create a task",
    icon: CheckSquare,
    color: "from-purple-500 to-violet-600",
    link: "/tasks",
  },
  {
    title: "New Note",
    subtitle: "Write notes",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    link: "/notes",
  },
  {
    title: "Planner",
    subtitle: "Study session",
    icon: CalendarDays,
    color: "from-orange-500 to-red-500",
    link: "/planner",
  },
  {
    title: "Profile",
    subtitle: "View profile",
    icon: User,
    color: "from-green-500 to-emerald-600",
    link: "/profile",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="text-gray-500 mt-2">
          Quickly access the most used features.
        </p>
      </div>

      <div className="grid  grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="
                group
                rounded-3xl
                border
                border-gray-100
                p-4 sm:p-5 lg:p-6
                sm:hover:shadow-xl
                sm:hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <div
                className={`
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  lg:w-16
                  lg:h-16 
                  rounded-2xl
                  bg-linear-to-r
                  ${action.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  group-hover:scale-110
                  transition
                `}
              >
                <Icon
                  size={30}
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                />
              </div>

              <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-1 text-gray-500 text-xs sm:text-sm ">
                {action.subtitle}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
