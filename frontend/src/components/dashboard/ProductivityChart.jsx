const ProductivityChart = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100  ">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Weekly productivity
          </h2>

          <p className="text-gray-500 mt-1">Hours studied per day</p>
        </div>

        <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
          +18% vs last week
        </span>
      </div>

      <div className=" flex items-end justify-around mt-12">
        <div className="text-center">
          <div className="h-20 w-8 bg-indigo-400 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Mon</p>
        </div>

        <div className="text-center">
          <div className="h-32 w-8 bg-indigo-500 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Tue</p>
        </div>

        <div className="text-center">
          <div className="h-24 w-8 bg-indigo-400 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Wed</p>
        </div>

        <div className="text-center">
          <div className="h-40 w-8 bg-indigo-500 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Thu</p>
        </div>

        <div className="text-center">
          <div className="h-28 w-8 bg-indigo-400 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Fri</p>
        </div>

        <div className="text-center">
          <div className="h-44 w-8 bg-indigo-500 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Sat</p>
        </div>

        <div className="text-center">
          <div className="h-36 w-8 bg-indigo-400 rounded-t-xl"></div>
          <p className="mt-3 text-gray-500">Sun</p>
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
