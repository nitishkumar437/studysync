import asyncHandler from "../utils/asyncHandler.js";
import {
  createTeacherService,
  getAllTeachersService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService,
} from "../services/teacherService.js";

// Create Teacher
const createTeacher = asyncHandler(async (req, res) => {
  const teacher = await createTeacherService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Teacher created successfully.",
    teacher,
  });
});

// Get All Teachers
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await getAllTeachersService(req.user);

  res.status(200).json({
    success: true,
    teachers,
  });
});
// Get Single Teacher
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await getTeacherByIdService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    teacher,
  });
});
// Update Teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await updateTeacherService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Teacher updated successfully.",
    teacher,
  });
});
// Delete Teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const result = await deleteTeacherService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});
export {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
