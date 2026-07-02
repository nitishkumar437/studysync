import Task from "../models/Task.js";
import Note from "../models/Note.js";
import Planner from "../models/Planner.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const defaultWeeklyData = [
  { day: "Mon", completed: 0 },
  { day: "Tue", completed: 0 },
  { day: "Wed", completed: 0 },
  { day: "Thu", completed: 0 },
  { day: "Fri", completed: 0 },
  { day: "Sat", completed: 0 },
  { day: "Sun", completed: 0 },
];

export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalTasks = await Task.countDocuments({
    user: req.user.id,
  });

  const completedTasks = await Task.countDocuments({
    user: req.user.id,
    status: "Completed",
  });

  const pendingTasks = await Task.countDocuments({
    user: req.user.id,
    status: "Pending",
  });

  const totalNotes = await Note.countDocuments({
    user: req.user.id,
  });

  const plannerCount = await Planner.countDocuments({
    user: req.user.id,
  });

  const user = await User.findById(req.user.id).select(
    "name avatar studyStreak studyHours",
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const todayTasks = await Task.find({
    user: req.user.id,
    status: "Pending",
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title description priority dueDate status");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const completedTaskList = await Task.find({
    user: req.user.id,
    status: "Completed",
    updatedAt: {
      $gte: sevenDaysAgo,
    },
  }).select("updatedAt");

  const weeklyData = defaultWeeklyData.map((item) => ({
    ...item,
  }));

  completedTaskList.forEach((task) => {
    const dayIndex = (new Date(task.updatedAt).getDay() + 6) % 7;

    weeklyData[dayIndex].completed += 1;
  });

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  res.status(200).json({
    success: true,

    stats: {
      totalTasks,
      completedTasks,
      pendingTasks,
      totalNotes,
      plannerCount,
      completionRate,
      studyStreak: user.studyStreak || 0,
      studyHours: user.studyHours || 0,
      name: user.name || "",
      avatar: user.avatar || "",
    },

    todayTasks,

    weeklyData,
  });
});
