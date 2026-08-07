import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create Teacher
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
    name,
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
  });

  // Return teacher without password
  return await User.findById(teacher._id).select("-password");
};

// Get All Teachers
const getAllTeachersService = async (director) => {
  const teachers = await User.find({
    role: "teacher",
    institute: director.institute,
    isActive: true,
  }).select("-password");

  return teachers;
};

// Get Teacher By ID
const getTeacherByIdService = async (teacherId, director) => {
  const teacher = await User.findOne({
    _id: teacherId,
    role: "teacher",
    institute: director.institute,
    isActive: true,
  }).select("-password");

  if (!teacher) {
    throw new Error("Teacher not found.");
  }

  return teacher;
};
// Update Teacher
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
      email: email.toLowerCase(),
      _id: { $ne: teacherId },
    });

    if (existingTeacher) {
      throw new Error("Email already exists.");
    }

    teacher.email = email.toLowerCase();
  }
  teacher.name = name ?? teacher.name;
  teacher.phone = phone ?? teacher.phone;
  teacher.about = about ?? teacher.about;
  teacher.qualification = qualification ?? teacher.qualification;
  teacher.experience = experience ?? teacher.experience;
  teacher.gender = gender ?? teacher.gender;
  teacher.address = address ?? teacher.address;

  await teacher.save();

  return await User.findById(teacher._id).select("-password");
};
// Soft Delete Teacher
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

  teacher.isActive = false;

  await teacher.save();

  return {
    message: "Teacher deleted successfully.",
  };
};

export {
  createTeacherService,
  getAllTeachersService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService,
};
