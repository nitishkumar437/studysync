import { Search, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className=" px-6 py-4 flex justify-between items-center border-b">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 rounded-xl border"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell />

        <div className="w-10 h-10 rounded-full bg-purple-500"></div>
      </div>
    </div>
  );
};

export default Navbar;
