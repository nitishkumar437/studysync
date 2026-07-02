import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import Hero from "../components/dashboard/Hero";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import TaskList from "../components/dashboard/TaskList";
import RecentNotes from "../components/dashboard/RecentNotes";
import StatCard from "../components/cards/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import { TrendingUp, Clock3, CheckCircle, BookOpen } from "lucide-react";

import { getDashboardStats } from "../services/dashboardService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalNotes: 0,
    completionRate: 0,
  });
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentNotes, setRecentNotes] = useState([]);
  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();

      if (data.success) {
        setStats(data.stats);
        setTodayTasks(data.todayTasks || []);
        setWeeklyData(data.weeklyData || []);
        setRecentNotes(data.recentNotes || []);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboardStats();
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-5 text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-425 mx-auto">
        <Hero stats={stats} />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            subtitle="All Tasks"
            icon={<CheckCircle size={22} />}
          />

          <StatCard
            title="Completed"
            value={stats.completedTasks}
            subtitle={`${stats.completionRate}% Completed`}
            icon={<TrendingUp size={22} />}
          />

          <StatCard
            title="Pending"
            value={stats.pendingTasks}
            subtitle="Need Attention"
            icon={<Clock3 size={22} />}
          />

          <StatCard
            title="Notes"
            value={stats.totalNotes}
            subtitle="Saved Notes"
            icon={<BookOpen size={22} />}
          />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 mt-10">
          <div className="xl:col-span-2">
            <ProductivityChart weeklyData={weeklyData} />
          </div>

          <TaskList tasks={todayTasks} />
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-10">
          <QuickActions />

          <RecentNotes notes={recentNotes} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
