import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/dashboard/Hero";
import StatCard from "../components/cards/StatCard";
import { TrendingUp, Clock3, CheckCircle, Flame } from "lucide-react";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import TaskList from "../components/dashboard/TaskList";
import CourseProgress from "../components/dashboard/CourseProgress";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login");
  };
  const userName = localStorage.getItem("userName");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <Hero />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            <StatCard
              title="Focus Score"
              value="92%"
              subtitle="+12% this week"
              icon={<TrendingUp size={22} />}
            />

            <StatCard
              title="Study Hours"
              value="24.5h"
              subtitle="Weekly"
              icon={<Clock3 size={22} />}
            />

            <StatCard
              title="Tasks Done"
              value="14/20"
              subtitle="70% completed"
              icon={<CheckCircle size={22} />}
            />

            <StatCard
              title="Streak"
              value="12d"
              subtitle="Personal best!"
              icon={<Flame size={22} />}
            />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="col-span-2">
              <ProductivityChart />
            </div>

            <TaskList />
          </div>
          <CourseProgress subject="DBMS" progress={75} />
        </main>
        {/* <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
