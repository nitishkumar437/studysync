import { BookOpen } from "lucide-react";

const CourseProgress = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Course Progress</h2>

          <p className="text-gray-500 mt-1">
            Track completion across your enrolled subjects
          </p>
        </div>

        <BookOpen size={28} className="text-gray-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Left Side */}

        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Discrete Mathematics</span>

              <span className="font-semibold text-gray-500">72%</span>
            </div>

            <div className="h-3 bg-indigo-100 rounded-full">
              <div className="h-3 bg-indigo-500 rounded-full w-[72%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Data Structures</span>

              <span className="font-semibold text-gray-500">88%</span>
            </div>

            <div className="h-3 bg-indigo-100 rounded-full">
              <div className="h-3 bg-indigo-500 rounded-full w-[88%]"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Organic Chemistry</span>

              <span className="font-semibold text-gray-500">45%</span>
            </div>

            <div className="h-3 bg-indigo-100 rounded-full">
              <div className="h-3 bg-indigo-500 rounded-full w-[45%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Modern Literature</span>

              <span className="font-semibold text-gray-500">30%</span>
            </div>

            <div className="h-3 bg-indigo-100 rounded-full">
              <div className="h-3 bg-indigo-500 rounded-full w-[30%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
