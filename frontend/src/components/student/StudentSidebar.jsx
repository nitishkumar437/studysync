import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CheckSquare,
  User,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const StudentSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.clear();

    setSidebarOpen(false);

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
      isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-60
          bg-white
          border-r
          border-gray-200
          p-5
          z-50
          transform
          transition-transform
          duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Student Panel</h1>

            <p className="text-sm text-gray-500">Student</p>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mt-10 space-y-3">
          <NavLink
            to="/student-dashboard"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/student/subjects"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <BookOpen size={20} />
            Subjects
          </NavLink>

          <NavLink
            to="/notes"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={20} />
            Notes
          </NavLink>

          <NavLink
            to="/tasks"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <CheckSquare size={20} />
            Tasks
          </NavLink>

          <NavLink
            to="/profile"
            className={navClass}
            onClick={() => setSidebarOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>
        </nav>

        <div className="absolute bottom-8 left-5 right-5">
          <button
            onClick={handleSignout}
            className="
              flex
              items-center
              gap-3
              w-full
              p-3
              rounded-xl
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
