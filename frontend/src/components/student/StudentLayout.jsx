import { useState } from "react";

import Navbar from "../layout/Navbar";

import StudentSidebar from "./StudentSidebar";

const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-60">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main
          className="
            pt-24
            px-4
            pb-6
            md:px-6
            md:pb-8
            lg:px-8
            lg:pb-10
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
