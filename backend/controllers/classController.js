import asyncHandler from "../utils/asyncHandler.js";

import {
  createClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
  deleteClassService,
} from "../services/classService.js";

// ======================================================
// Create Class
// ======================================================

const createClass = asyncHandler(async (req, res) => {
  const classData = await createClassService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Class created successfully.",
    classData,
  });
});

// ======================================================
// Get All Classes
// ======================================================

const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await getAllClassesService(req.user);

  res.status(200).json({
    success: true,
    classes,
  });
});

// ======================================================
// Get Class By ID
// ======================================================

const getClassById = asyncHandler(async (req, res) => {
  const classData = await getClassByIdService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    classData,
  });
});

// ======================================================
// Update Class
// ======================================================

const updateClass = asyncHandler(async (req, res) => {
  const classData = await updateClassService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Class updated successfully.",
    classData,
  });
});

// ======================================================
// Delete Class
// ======================================================

const deleteClass = asyncHandler(async (req, res) => {
  const result = await deleteClassService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export { createClass, getAllClasses, getClassById, updateClass, deleteClass };
