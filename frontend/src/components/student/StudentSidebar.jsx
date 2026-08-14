import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r bg-white p-5">
      <h1 className="mb-10 text-xl font-bold">Student Panel</h1>

      <nav className="space-y-3">
        <NavLink to="/student/dashboard">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <LayoutDashboard size={20} />
            Dashboard
          </div>
        </NavLink>

        <NavLink to="/student/subjects">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <BookOpen size={20} />
            Subjects
          </div>
        </NavLink>

        <NavLink to="/student/tasks">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <CheckSquare size={20} />
            Tasks
          </div>
        </NavLink>

        <NavLink to="/student/notes">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <FileText size={20} />
            Notes
          </div>
        </NavLink>

        <NavLink to="/student/planner">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            <Calendar size={20} />
            Planner
          </div>
        </NavLink>

        <NavLink to="/student/profile">
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

export default StudentSidebar;
