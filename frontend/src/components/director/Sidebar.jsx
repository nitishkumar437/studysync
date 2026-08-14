import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar,
  User,
  Users,
  GraduationCap,
  BookOpen,
  School,
  LogOut,
  X,
  Settings,
  Building2,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { getInstitute } from "../../services/instituteService";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const [institute, setInstitute] = useState(null);
  const [loadingInstitute, setLoadingInstitute] = useState(true);

  // Fetch institute information
  const fetchInstitute = async () => {
    try {
      setLoadingInstitute(true);

      const response = await getInstitute();

      setInstitute(response.institute || null);
    } catch (error) {
      console.error("Failed to load institute:", error);
    } finally {
      setLoadingInstitute(false);
    }
  };

  useEffect(() => {
    fetchInstitute();

    // Settings update hone ke baad Sidebar refresh
    const handleInstituteUpdate = () => {
      fetchInstitute();
    };

    window.addEventListener("instituteUpdated", handleInstituteUpdate);

    return () => {
      window.removeEventListener("instituteUpdated", handleInstituteUpdate);
    };
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setSidebarOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
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

      {/* Sidebar */}
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
        {/* Institute Branding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Institute Logo */}
            {institute?.logo ? (
              <img
                src={institute.logo}
                alt={institute.name || "Institute Logo"}
                className="w-12 h-12 rounded-xl object-contain border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <Building2 size={27} className="text-violet-600" />
              </div>
            )}

            {/* Institute Name */}
            <div className="min-w-0">
              {loadingInstitute ? (
                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
              ) : (
                <h1
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                    leading-tight
                    truncate
                  "
                  title={institute?.name || "Institute"}
                >
                  {institute?.name || "Institute"}
                </h1>
              )}

              <p className="text-xs text-gray-500 mt-1">Institute</p>
            </div>
          </div>

          {/* Mobile Close */}
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

        {/* Navigation */}
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
            to="/teachers"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <Users size={20} />
            Teachers
          </NavLink>

          <NavLink
            to="/students"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <GraduationCap size={20} />
            Students
          </NavLink>

          <NavLink
            to="/subjects"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <BookOpen size={20} />
            Subjects
          </NavLink>

          <NavLink
            to="/classes"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <School size={20} />
            Classes
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
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>

        {/* Sign Out */}
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
