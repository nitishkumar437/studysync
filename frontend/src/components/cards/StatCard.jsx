import React from "react";

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      p-6
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">{value}</h2>

          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-linear-to-br
          from-indigo-100
          to-purple-100
          flex
          items-center
          justify-center
          text-indigo-600
          group-hover:scale-110
          transition-transform
          duration-300
          "
        >
          {icon}
        </div>
      </div>
 
      <div className="mt-4">
        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="
            h-full
            w-3/4
            rounded-full
            bg-linear-to-r
            from-indigo-500
            to-purple-500
            "
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatCard);
