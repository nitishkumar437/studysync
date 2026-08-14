import { useState } from "react";

import Navbar from "./Navbar";

import Sidebar from "../director/Sidebar";
import TeacherSidebar from "../teacher/TeacherSidebar";
import StudentSidebar from "../student/StudentSidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = localStorage.getItem("role");

  const renderSidebar = () => {
    switch (role) {
      case "teacher":
        return (
          <TeacherSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );

      case "student":
        return (
          <StudentSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );

      default:
        return (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSidebar()}

      <div className="lg:ml-60">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="pt-24 px-4 pb-6 md:px-6 md:pb-8 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
