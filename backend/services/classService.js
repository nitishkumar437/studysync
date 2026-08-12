import Class from "../models/Class.js";

// ======================================================
// Create Class
// ======================================================

const createClassService = async (data, user) => {
  const { name, sections = [] } = data;

  if (!name) {
    throw new Error("Class name is required.");
  }

  const className = name.trim();

  // Check duplicate class
  const existingClass = await Class.findOne({
    name: className,
    institute: user.institute,
    isActive: true,
  });

  if (existingClass) {
    throw new Error("Class already exists.");
  }

  // Remove duplicate sections
  const uniqueSections = [
    ...new Set(sections.map((section) => section.trim()).filter(Boolean)),
  ];

  const newClass = await Class.create({
    name: className,
    sections: uniqueSections,
    institute: user.institute,
    createdBy: user._id,
  });

  return newClass;
};

// ======================================================
// Get All Classes
// ======================================================

const getAllClassesService = async (user) => {
  return await Class.find({
    institute: user.institute,
    isActive: true,
  }).sort({ createdAt: -1 });
};

// ======================================================
// Get Class By ID
// ======================================================

const getClassByIdService = async (classId, user) => {
  const classData = await Class.findOne({
    _id: classId,
    institute: user.institute,
    isActive: true,
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  return classData;
};

// ======================================================
// Update Class
// ======================================================

const updateClassService = async (classId, data, user) => {
  const { name, sections } = data;

  const classData = await Class.findOne({
    _id: classId,
    institute: user.institute,
    isActive: true,
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  // Update name
  if (name && name.trim() !== classData.name) {
    const className = name.trim();

    const existingClass = await Class.findOne({
      name: className,
      institute: user.institute,
      _id: { $ne: classId },
      isActive: true,
    });

    if (existingClass) {
      throw new Error("Class already exists.");
    }

    classData.name = className;
  }

  // Update sections
  if (Array.isArray(sections)) {
    classData.sections = [
      ...new Set(sections.map((section) => section.trim()).filter(Boolean)),
    ];
  }

  await classData.save();

  return classData;
};

// ======================================================
// Delete Class
// ======================================================

const deleteClassService = async (classId, user) => {
  const classData = await Class.findOne({
    _id: classId,
    institute: user.institute,
    isActive: true,
  });

  if (!classData) {
    throw new Error("Class not found.");
  }

  // Soft delete
  classData.isActive = false;

  await classData.save();

  return {
    message: "Class deleted successfully.",
  };
};

// ======================================================
// Export
// ======================================================

export {
  createClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
  deleteClassService,
};
