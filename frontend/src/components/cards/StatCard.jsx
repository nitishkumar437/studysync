const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <h3 className="text-gray-500 text-sm font-semibold uppercase">
          {title}
        </h3>

        <div className="bg-purple-50 text-purple-500 p-3 rounded-2xl">
          {icon}
        </div>
      </div>

      <h2 className="text-5xl font-bold text-gray-900 mt-6">{value}</h2>

      <p className="text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
