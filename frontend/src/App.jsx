import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Notes from "./pages/Notes.jsx";
import Tasks from "./pages/Tasks.jsx";
import Planner from "./pages/Planner.jsx";
import Profile from "./pages/Profile.jsx";
import "react-easy-crop/react-easy-crop.css";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
