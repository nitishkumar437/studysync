import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar,
  User,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setSidebarOpen(false);

    navigate("/login");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="
      fixed
      inset-0
      bg-black/40
      z-40
      lg:hidden
      "
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
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-r from-purple-500 to-violet-600 shadow-lg">
              <GraduationCap size={22} className="text-white" />
            </div>

            <span className="text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              StudySync
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="
    lg:hidden
    p-2
    rounded-lg
    hover:bg-gray-100
  "
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mt-10 space-y-3">
          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <CheckSquare size={20} />
            Tasks
          </NavLink>

          <NavLink
            to="/notes"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <FileText size={20} />
            Notes
          </NavLink>

          <NavLink
            to="/planner"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <Calendar size={20} />
            Planner
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200  ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
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

export default Sidebar;
