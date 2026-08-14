import { Routes, Route } from "react-router-dom";

import "./App.css";
import "react-easy-crop/react-easy-crop.css";

import { Toaster } from "react-hot-toast";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Director Pages
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Classes from "./pages/Classes";
import Settings from "./pages/Settings";

// Common Pages
import Notes from "./pages/Notes";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* ================================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ================================================= */}
        {/* DIRECTOR ROUTES */}
        {/* ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* TEACHER ROUTES */}
        {/* ================================================= */}

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* STUDENT ROUTES */}
        {/* ================================================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/* COMMON ROUTES */}
        {/* ================================================= */}

        <Route
          path="/notes"
          element={
            <ProtectedRoute allowedRoles={["director", "teacher", "student"]}>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={["director", "teacher", "student"]}>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/planner"
          element={
            <ProtectedRoute allowedRoles={["director", "teacher", "student"]}>
              <Planner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["director", "teacher", "student"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
