import User from "../models/User.js";
import Subject from "../models/Subject.js";
import bcrypt from "bcryptjs";

// Create Teacher
// ======================================================

const createTeacherService = async (data, director) => {
  const {
    name,
    email,
    password,
    phone,
    qualification,
    experience,
    gender,
    address,
  } = data;

  // Validation
  if (!name || !email || !password) {
    throw new Error("Name, Email and Password are required.");
  }

  // Check duplicate email
  const existingTeacher = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (existingTeacher) {
    throw new Error("Teacher email already exists.");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Teacher
  const teacher = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    phone,
    qualification,
    experience,
    gender,
    address,
    role: "teacher",
    institute: director.institute,
    createdBy: director._id,
    subjects: [],
  });

  // Return teacher without password
  return await User.findById(teacher._id)
    .select("-password")
    .populate("subjects", "name code description");
};

// ======================================================
// Get All Teachers
// ======================================================

const getAllTeachersService = async (director) => {
  const teachers = await User.find({
    role: "teacher",
    institute: director.institute,
    isActive: true,
  })
    .select("-password")
    .populate("subjects", "name code description")
    .sort({ createdAt: -1 });

  return teachers;
};

// ======================================================
// Get Teacher By ID
// ======================================================

const getTeacherByIdService = async (teacherId, director) => {
  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  })
    .select("-password")
    .populate("subjects", "name code description");

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  return teacher;
};

// ======================================================
// Update Teacher
// ======================================================

const updateTeacherService = async (teacherId, data, director) => {
  const {
    name,
    email,
    phone,
    about,
    qualification,
    experience,
    gender,
    address,
  } = data;

  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  });

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  // Duplicate email check
  if (email && email.toLowerCase().trim() !== teacher.email) {
    const existingTeacher = await User.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: teacherId },
    });

    if (existingTeacher) {
      throw new Error("Email already exists.");
    }

    teacher.email = email.toLowerCase().trim();
  }

  teacher.name = name?.trim() ?? teacher.name;
  teacher.phone = phone ?? teacher.phone;
  teacher.about = about ?? teacher.about;
  teacher.qualification = qualification ?? teacher.qualification;
  teacher.experience = experience ?? teacher.experience;
  teacher.gender = gender ?? teacher.gender;
  teacher.address = address ?? teacher.address;

  await teacher.save();

  return await User.findById(teacher._id)
    .select("-password")
    .populate("subjects", "name code description");
};

// ======================================================
// Delete Teacher
// ======================================================

const deleteTeacherService = async (teacherId, director) => {
  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  });

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  // Soft Delete
  teacher.isActive = false;

  await teacher.save();

  return {
    message: "Teacher deleted successfully.",
  };
};

// ======================================================
// Assign Subjects To Teacher
// ======================================================

const assignSubjectsToTeacherService = async (
  teacherId,
  subjectIds,
  director,
) => {
  // Validate subjectIds
  if (!Array.isArray(subjectIds)) {
    throw new Error("Subject IDs must be an array.");
  }

  // Find Teacher
  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  });

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  // Remove duplicate IDs
  const uniqueSubjectIds = [...new Set(subjectIds.map((id) => id.toString()))];

  // Check Subjects
  const subjects = await Subject.find({
    _id: { $in: uniqueSubjectIds },
    institute: director.institute,
    isActive: true,
  });

  // Check whether all requested subjects exist
  if (subjects.length !== uniqueSubjectIds.length) {
    throw new Error(
      "One or more subjects are invalid or do not belong to your institute.",
    );
  }

  // Assign subjects
  teacher.subjects = subjects.map((subject) => subject._id);

  await teacher.save();

  // Return updated teacher
  return await User.findById(teacher._id)
    .select("-password")
    .populate("subjects", "name code description");
};

 
// Remove Subject From Teacher
 

const removeSubjectFromTeacherService = async (
  teacherId,
  subjectId,
  director,
) => {
  // Find Teacher
  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  });

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  // Check Subject belongs to same institute
  const subject = await Subject.findOne({
    _id: subjectId,
    institute: director.institute,
    isActive: true,
  });

  if (!subject) {
    throw new Error("Subject not found or does not belong to your institute.");
  }

  // Remove subject
  teacher.subjects = teacher.subjects.filter(
    (id) => id.toString() !== subjectId.toString(),
  );

  await teacher.save();

  // Return updated teacher
  return await User.findById(teacher._id)
    .select("-password")
    .populate("subjects", "name code description");
};
 
export {
  createTeacherService,
  getAllTeachersService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService,
  assignSubjectsToTeacherService,
  removeSubjectFromTeacherService,
};
