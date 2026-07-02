import { Link } from "react-router-dom";
import { FileText, ArrowRight, CalendarDays } from "lucide-react";

const categoryColors = {
  CS: "bg-purple-100 text-purple-600",
  Math: "bg-blue-100 text-blue-600",
  Science: "bg-green-100 text-green-600",
  Literature: "bg-orange-100 text-orange-600",
  General: "bg-gray-100 text-gray-600",
};

const RecentNotes = ({ notes = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Recent Notes
          </h2>

          <p className="text-gray-500 mt-1">Your latest study notes</p>
        </div>

        <Link
          to="/notes"
          className=" shrink-0 flex items-center gap-1 text-sm text-indigo-600 font-semibold hover:text-indigo-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
              <FileText size={36} className="text-indigo-600" />
            </div>

            <h3 className="mt-5 text-xl font-bold">No Notes Yet</h3>

            <p className="text-gray-500 mt-2">Create your first note.</p>
          </div>
        ) : (
          notes.slice(0, 3).map((note) => (
            <div
              key={note._id}
              className="
              border
              border-gray-100
              rounded-2xl
              p-4
              hover:bg-indigo-50
              hover:border-indigo-200
              transition
              "
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {note.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {note.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        categoryColors[note.category] || categoryColors.General
                      }`}
                    >
                      {note.category}
                    </span>

                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <CalendarDays size={15} />

                      {new Date(note.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentNotes;
