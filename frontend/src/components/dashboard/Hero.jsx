const Hero = () => {
  const userName = localStorage.getItem("userName") || "Student";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-linear-to-r from-indigo-500 to-purple-400 rounded-[30px] px-10 py-12 text-white shadow-sm">
      <p className="uppercase text-sm font-semibold tracking-wider opacity-90">
        {today}
      </p>

      <h1 className="text-5xl font-bold mt-3">Welcome back, {userName} 👋</h1>

      <p className="mt-4 text-xl opacity-90 max-w-2xl">
        You have 3 tasks due today and a 12-day study streak. Keep it up.
      </p>

      <button className="mt-8 bg-white text-gray-800 px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300">
        + Start focus session
      </button>
    </div>
  );
};

export default Hero;
