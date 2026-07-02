 
import Planner from "../models/Planner.js";
import asyncHandler from "../utils/asyncHandler.js";
 
export const createPlanner = asyncHandler(async (req, res) => {
  const {
    subject,
    title,
    description,
    date,
    startTime,
    endTime,
    priority,
  } = req.body;

  if (!subject || !title || !date || !startTime || !endTime) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  const planner = await Planner.create({
    subject,
    title,
    description,
    date,
    startTime,
    endTime,
    priority,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Planner session created successfully",
    planner,
  });
});

export const getPlanners = asyncHandler(async (req, res) => {
  const planners = await Planner.find({
    user: req.user.id,
  }).sort({
    date: 1,
    startTime: 1,
  });

  res.status(200).json({
    success: true,
    count: planners.length,
    planners,
  });
});

export const updatePlanner = asyncHandler(async (req, res) => {
  const {
    subject,
    title,
    description,
    date,
    startTime,
    endTime,
    priority,
    status,
  } = req.body;

  const planner = await Planner.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!planner) {
    return res.status(404).json({
      success: false,
      message: "Planner session not found",
    });
  }

  planner.subject = subject || planner.subject;
  planner.title = title || planner.title;
  planner.description = description || planner.description;
  planner.date = date || planner.date;
  planner.startTime = startTime || planner.startTime;
  planner.endTime = endTime || planner.endTime;
  planner.priority = priority || planner.priority;
  planner.status = status || planner.status;

  await planner.save();

  res.status(200).json({
    success: true,
    message: "Planner session updated successfully",
    planner,
  });
});
 
export const deletePlanner = asyncHandler(async (req, res) => {
  const planner = await Planner.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!planner) {
    return res.status(404).json({
      success: false,
      message: "Planner session not found",
    });
  }

  await planner.deleteOne();

  res.status(200).json({
    success: true,
    message: "Planner session deleted successfully",
  });
});

export const togglePlannerStatus = asyncHandler(async (req, res) => {
  const planner = await Planner.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!planner) {
    return res.status(404).json({
      success: false,
      message: "Planner session not found",
    });
  }

  planner.status =
    planner.status === "Pending"
      ? "Completed"
      : "Pending";

  await planner.save();

  res.status(200).json({
    success: true,
    message: "Planner status updated successfully",
    planner,
  });
});
 
