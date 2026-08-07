import asyncHandler from "../utils/asyncHandler.js";

import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentService.js";

// Create Student
const createStudent = asyncHandler(async (req, res) => {
  const student = await createStudentService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    student,
  });
});

// Get All Students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudentsService(req.user);

  res.status(200).json({
    success: true,
    students,
  });
});

// Get Student By ID
const getStudentById = asyncHandler(async (req, res) => {
  const student = await getStudentByIdService(
    req.params.id,
    req.user
  );

  res.status(200).json({
    success: true,
    student,
  });
});

// Update Student
const updateStudent = asyncHandler(async (req, res) => {
  const student = await updateStudentService(
    req.params.id,
    req.body,
    req.user
  );

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    student,
  });
});

// Delete Student
const deleteStudent = asyncHandler(async (req, res) => {
  const result = await deleteStudentService(
    req.params.id,
    req.user
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};