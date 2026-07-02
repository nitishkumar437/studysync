import {
  Pencil,
  Trash2,
  FileText,
  Calculator,
  FlaskConical,
  BookOpen,
} from "lucide-react";

const NoteCard = ({ id, title, content, category, time, onDelete, onEdit }) => {
  const getCategoryIcon = () => {
    switch (category) {
      case "Math":
        return <Calculator size={24} className="text-blue-600" />;

      case "Science":
        return <FlaskConical size={24} className="text-green-600" />;

      case "Literature":
        return <BookOpen size={24} className="text-orange-600" />;

      default:
        return <FileText size={24} className="text-purple-600" />;
    }
  };

  const getBadgeColor = () => {
    switch (category) {
      case "Math":
        return "bg-blue-100 text-blue-700 border-t-2 border-blue-500 ";

      case "Science":
        return "bg-green-100 text-green-700 border-t-2 border-green-500 ";

      case "Literature":
        return "bg-orange-100 text-orange-700 border-t-2 border-orange-500";

      case "CS":
        return "bg-purple-100 text-purple-700 border-t-2 border-purple-700";

      default:
        return "bg-gray-100 text-gray-700 border-t-2 border-gray-700";
    }
  };

  return (
    <div
      className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1
transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
          {getCategoryIcon()}
        </div>

        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-2xl">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <Pencil />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {title}
      </h3>

      <p className="text-gray-500 mb-6 line-clamp-2">{content}</p>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm ${getBadgeColor()}`}>
          {category}
        </span>

        <span className="text-gray-500 text-sm">
          {new Date(time).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
