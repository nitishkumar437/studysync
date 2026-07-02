import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";

import TodayGoals from "../components/planner/TodayGoals";
import HoursToday from "../components/planner/HoursToday";
import WeeklyTimetable from "../components/planner/WeeklyTimetable";
import HoursBySubject from "../components/planner/HoursbySubject";
import PlannerCard from "../components/planner/PlannerCard";
import PlannerModal from "../components/planner/PlannerModal";
import DeleteModal from "../components/common/DeleteModal";

import {
  getPlanners,
  deletePlanner,
  togglePlannerStatus,
} from "../services/plannerService";

const Planner = () => {
  const [loading, setLoading] = useState(true);

  const [planners, setPlanners] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedPlanner, setSelectedPlanner] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plannerToDelete, setPlannerToDelete] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchPlanners = async () => {
    try {
      const data = await getPlanners();

      if (data.success) {
        setPlanners(data.planners);
      }
    } catch (error) {
      console.log("Error fetching planners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanners();
  }, []);

  const filteredPlanners = planners.filter((planner) => {
    const matchesSearch =
      planner.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planner.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Pending"
          ? planner.status === "Pending"
          : planner.status === "Completed";

    return matchesSearch && matchesFilter;
  });

  const handleEdit = (planner) => {
    setSelectedPlanner(planner);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPlannerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleToggleStatus = async (planner) => {
    try {
      const data = await togglePlannerStatus(planner._id);

      if (data.success) {
        fetchPlanners();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      const data = await deletePlanner(plannerToDelete);

      if (data.success) {
        fetchPlanners();

        setPlannerToDelete(null);

        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Study Planner
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Plan your study sessions and stay productive.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedPlanner(null);
            setIsModalOpen(true);
          }}
          className="
      w-full
      sm:w-auto
      px-6
      py-3
      rounded-2xl
      bg-linear-to-r
      from-indigo-600
      to-violet-600
      text-white
      font-semibold
      shadow-lg
      hover:shadow-xl
      hover:scale-105
      transition-all
      duration-300
    "
        >
          + Add Session
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <TodayGoals planners={planners} />

        <HoursToday planners={planners} />
      </div>

      <div className="mb-8">
        <WeeklyTimetable planners={planners} />
      </div>

      <div className="mb-8">
        <HoursBySubject planners={planners} />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search study session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 transition"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => setFilter("All")}
              className={` flex-1 sm:flex-none px-5 py-3 rounded-xl font-medium transition ${filter === "All" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Pending")}
              className={`px-5 py-2 rounded-xl ${
                filter === "Pending"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("Completed")}
              className={`px-5 py-2 rounded-xl ${
                filter === "Completed"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Today's Study Sessions
        </h2>

        <p className="text-gray-500 mt-2">
          Manage all your scheduled study sessions.
        </p>
      </div>
      {loading ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">Loading Study Planner...</p>
        </div>
      ) : (
        <>
          {filteredPlanners.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800">
                No Study Sessions Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first study session to get started.
              </p>

              <button
                onClick={() => {
                  setSelectedPlanner(null);
                  setIsModalOpen(true);
                }}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
              >
                + Add Session
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredPlanners.map((planner) => (
                <PlannerCard
                  key={planner._id}
                  planner={planner}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </>
      )}

      <PlannerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlanner(null);
        }}
        fetchPlanners={fetchPlanners}
        selectedPlanner={selectedPlanner}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPlannerToDelete(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete Study Session"
        message="Are you sure you want to delete this study session? This action cannot be undone."
      />
    </DashboardLayout>
  );
};

export default Planner;
