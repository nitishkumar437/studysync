import { Search, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
const Navbar = ({ setSidebarOpen }) => {
  const { user } = useUser();
  return (
    <div
      className="
      fixed
      top-0
      left-0
      lg:left-60
      right-0
      bg-white
      border-b
      border-gray-200
      shadow-sm
      z-30
      px-4
      md:px-6
      py-4
      h-20
      flex
      items-center
      justify-between
      gap-4
      "
    >
      {/* Left Section */}

      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="
          lg:hidden
          p-2
          rounded-lg
          hover:bg-gray-100
          transition
          "
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden md:block w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search notes, tasks..."
            className="
            w-full
            pl-10
            pr-4
            py-2.5
            rounded-xl
            border
            border-gray-300
            outline-none
            focus:border-purple-500
            transition
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="
          relative
          p-2
          rounded-xl
          hover:bg-gray-100
          transition
          "
        >
          <Bell size={22} />

          <span
            className="
            absolute
            top-1
            right-1
            w-2.5
            h-2.5
            rounded-full
            bg-red-500
            "
          ></span>
        </button>

        <Link to="/profile">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="
      w-10
      h-10
      rounded-full
      object-cover
      border-2
      border-gray-200
      hover:scale-105
      transition
      cursor-pointer
      "
            />
          ) : (
            <div
              className="
      w-10
      h-10
      rounded-full
      bg-linear-to-r
      from-purple-500
      to-violet-600
      flex
      items-center
      justify-center
      text-white
      font-semibold
      hover:scale-105
      transition
      cursor-pointer
      "
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
