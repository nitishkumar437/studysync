import TeacherSidebar from "./TeacherSidebar";

const TeacherLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar />

      <div className="ml-60 p-8">{children}</div>
    </div>
  );
};

export default TeacherLayout;
