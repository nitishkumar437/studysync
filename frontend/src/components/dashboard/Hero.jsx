import { CheckCircle2, Clock3, BookOpen, Sparkles } from "lucide-react";

const Hero = ({ stats }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-4xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 text-white p-6 sm:p-8 lg:p-10 shadow-xl">
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <p className="uppercase tracking-widest text-xs md:text-sm font-semibold opacity-80">
          {today}
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-3 leading-tight">
          {greeting}, {stats.name || "Student"} 👋
        </h1>

        <p className="mt-4 text-white/90 max-w-3xl text-sm md:text-lg leading-7">
          You have <span className="font-bold">{stats.pendingTasks}</span>{" "}
          pending task{stats.pendingTasks !== 1 && "s"} and completed{" "}
          <span className="font-bold">{stats.completedTasks}</span> task
          {stats.completedTasks !== 1 && "s"}. Keep pushing towards your goals
          🚀
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock3 size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold">{stats.pendingTasks}</p>

                <p className="text-sm text-white/80">Pending Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold">{stats.completedTasks}</p>

                <p className="text-sm text-white/80">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <BookOpen size={20} />
              </div>

              <div>
                <p className="text-2xl font-bold">{stats.totalNotes}</p>

                <p className="text-sm text-white/80">Notes</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="
          mt-8
          inline-flex
          items-center
          gap-2
          bg-white
          text-indigo-600
          font-semibold
          px-6
          py-3
          w-full sm:w-fit
          rounded-2xl
          hover:scale-105
          transition
          shadow-lg
          "
        >
          <Sparkles size={18} />
          Stay Productive
        </button>
      </div>
    </div>
  );
};

export default Hero;
