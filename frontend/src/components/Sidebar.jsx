import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <side className="w-72 border-r min-h-screen p-5">
      <h1 className="text-2xl font-bold text-purple-600">StudySync</h1>

      <nav className="mt-10 space-y-3">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-purple-100 text-purple-600">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">
          <CheckSquare size={20} />
          Tasks
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">
          <FileText size={20} />
          Notes
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">
          <Calendar size={20} />
          Planner
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">
          <User size={20} />
          Profile
        </button>
      </nav>

      <button className="flex items-center gap-3 mt-20 text-red-500">
        <LogOut size={20} />
        Sign Out
      </button>
    </side>
  );
};

export default Sidebar;
