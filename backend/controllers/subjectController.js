import asyncHandler from "../utils/asyncHandler.js";

import {
  createSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
  deleteSubjectService,
} from "../services/subjectService.js";

// Create Subject
const createSubject = asyncHandler(async (req, res) => {
  const subject = await createSubjectService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Subject created successfully.",
    subject,
  });
});

// Get All Subjects
const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await getAllSubjectsService(req.user);

  res.status(200).json({
    success: true,
    subjects,
  });
});

// Get Subject By ID
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await getSubjectByIdService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    subject,
  });
});

// Update Subject
const updateSubject = asyncHandler(async (req, res) => {
  const subject = await updateSubjectService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Subject updated successfully.",
    subject,
  });
});

// Delete Subject
const deleteSubject = asyncHandler(async (req, res) => {
  const result = await deleteSubjectService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
