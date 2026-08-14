import StudentSidebar from "./StudentSidebar";

const StudentLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentSidebar />

      <div className="ml-60 p-8">{children}</div>
    </div>
  );
};

export default StudentLayout;
