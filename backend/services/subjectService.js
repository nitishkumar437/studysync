import Subject from "../models/Subject.js";

// Create Subject
const createSubjectService = async (data, user) => {
  const { name, code, description } = data;

  // Validation
  if (!name || !code) {
    throw new Error("Subject name and code are required.");
  }

  // Duplicate Subject Code
  const existingCode = await Subject.findOne({
    institute: user.institute,
    code: code.toUpperCase().trim(),
    isActive: true,
  });

  if (existingCode) {
    throw new Error("Subject code already exists.");
  }

  // Duplicate Subject Name
  const existingName = await Subject.findOne({
    institute: user.institute,
    name: name.trim(),
    isActive: true,
  });

  if (existingName) {
    throw new Error("Subject name already exists.");
  }

  // Create Subject
  return await Subject.create({
    name: name.trim(),
    code: code.toUpperCase().trim(),
    description,
    institute: user.institute,
    createdBy: user._id,
  });
};

// Get All Subjects
const getAllSubjectsService = async (user) => {
  return await Subject.find({
    institute: user.institute,
    isActive: true,
  }).sort({ createdAt: -1 });
};

// Get Subject By Id
const getSubjectByIdService = async (subjectId, user) => {
  const subject = await Subject.findOne({
    _id: subjectId,
    institute: user.institute,
    isActive: true,
  });

  if (!subject) {
    throw new Error("Subject not found.");
  }

  return subject;
};

// Update Subject
const updateSubjectService = async (subjectId, data, user) => {
  const { name, code, description } = data;

  const subject = await Subject.findOne({
    _id: subjectId,
    institute: user.institute,
    isActive: true,
  });

  if (!subject) {
    throw new Error("Subject not found.");
  }

  // Duplicate Name
  if (name && name.trim() !== subject.name) {
    const existingName = await Subject.findOne({
      name: name.trim(),
      institute: user.institute,
      _id: { $ne: subjectId },
      isActive: true,
    });

    if (existingName) {
      throw new Error("Subject name already exists.");
    }

    subject.name = name.trim();
  }

  // Duplicate Code
  if (code && code.toUpperCase().trim() !== subject.code) {
    const existingCode = await Subject.findOne({
      code: code.toUpperCase().trim(),
      institute: user.institute,
      _id: { $ne: subjectId },
      isActive: true,
    });

    if (existingCode) {
      throw new Error("Subject code already exists.");
    }

    subject.code = code.toUpperCase().trim();
  }

  subject.description = description ?? subject.description;

  await subject.save();

  return subject;
};

// Delete Subject (Soft Delete)
const deleteSubjectService = async (subjectId, user) => {
  const subject = await Subject.findOne({
    _id: subjectId,
    institute: user.institute,
    isActive: true,
  });

  if (!subject) {
    throw new Error("Subject not found.");
  }

  subject.isActive = false;

  await subject.save();

  return {
    message: "Subject deleted successfully.",
  };
};

export {
  createSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
  deleteSubjectService,
};
