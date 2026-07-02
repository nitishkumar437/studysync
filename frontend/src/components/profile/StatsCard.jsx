import React from "react";
import { Flame, Clock3, BookOpen, CalendarDays } from "lucide-react";

const StatsCard = ({ user, notesCount = 0, plannerCount = 0 }) => {
  const stats = [
    {
      title: "Study Streak",
      value: `${user?.studyStreak || 0} Days`,
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Study Hours",
      value: `${user?.studyHours || 0} hrs`,
      icon: Clock3,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Notes",
      value: notesCount,
      icon: BookOpen,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
    },
    {
      title: "Planner",
      value: plannerCount,
      icon: CalendarDays,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>

                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}
              >
                <Icon size={28} className={stat.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(StatsCard);
