import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const TeacherSidebar = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r bg-white p-5">
      <h1 className="mb-10 text-xl font-bold">Teacher Panel</h1>

      <nav className="space-y-3">
        <NavLink to="/teacher/dashboard">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <LayoutDashboard size={20} />
            Dashboard
          </div>
        </NavLink>

        <NavLink to="/teacher/subjects">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <BookOpen size={20} />
            Subjects
          </div>
        </NavLink>

        <NavLink to="/teacher/notes">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <FileText size={20} />
            Notes
          </div>
        </NavLink>

        <NavLink to="/teacher/tasks">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <CheckSquare size={20} />
            Tasks
          </div>
        </NavLink>

        <NavLink to="/teacher/profile">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <User size={20} />
            Profile
          </div>
        </NavLink>
      </nav>

      <button
        onClick={handleSignout}
        className="absolute bottom-8 flex items-center gap-3 text-red-500"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </aside>
  );
};

export default TeacherSidebar;
