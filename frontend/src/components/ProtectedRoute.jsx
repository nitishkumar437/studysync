import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role allowed nahi hai
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "director") {
      return <Navigate to="/dashboard" replace />;
    }

    if (role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    }

    if (role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
