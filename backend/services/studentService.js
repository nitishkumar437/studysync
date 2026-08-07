import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create Student
const createStudentService = async (data, user) => {
  const {
    name,
    email,
    password,
    phone,
    rollNumber,
    className,
    section,
    gender,
    address,
    parentName,
    parentPhone,
  } = data;

  // Validation
  if (!name || !email || !password || !phone || !rollNumber || !className) {
    throw new Error("Please fill all required fields.");
  }

  // Check duplicate email
  const existingEmail = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (existingEmail) {
    throw new Error("Student email already exists.");
  }

  // Check duplicate roll number in same institute
  const existingRoll = await User.findOne({
    institute: user.institute,
    rollNumber,
    role: "student",
  });

  if (existingRoll) {
    throw new Error("Roll number already exists.");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Student
  const student = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    phone,

    rollNumber,
    className,
    section,
    gender,
    address,

    parentName,
    parentPhone,

    role: "student",

    institute: user.institute,

    createdBy: user._id,
  });

  return await User.findById(student._id).select("-password");
};

// Get All Students
const getAllStudentsService = async (user) => {
  return await User.find({
    role: "student",
    institute: user.institute,
    isActive: true,
  })
    .select("-password")
    .sort({ createdAt: -1 });
};

// Get Student By Id
const getStudentByIdService = async (studentId, user) => {
  const student = await User.findOne({
    _id: studentId,
    role: "student",
    institute: user.institute,
    isActive: true,
  }).select("-password");

  if (!student) {
    throw new Error("Student not found.");
  }

  return student;
};

// Update Student
const updateStudentService = async (studentId, data, user) => {
  const {
    name,
    email,
    phone,
    rollNumber,
    className,
    section,
    gender,
    address,
    parentName,
    parentPhone,
  } = data;

  const student = await User.findOne({
    _id: studentId,
    role: "student",
    institute: user.institute,
    isActive: true,
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  // Duplicate Email
  if (email && email.toLowerCase().trim() !== student.email) {
    const existingEmail = await User.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: studentId },
    });

    if (existingEmail) {
      throw new Error("Email already exists.");
    }

    student.email = email.toLowerCase().trim();
  }

  // Duplicate Roll Number
  if (rollNumber && rollNumber !== student.rollNumber) {
    const existingRoll = await User.findOne({
      rollNumber,
      role: "student",
      institute: user.institute,
      _id: { $ne: studentId },
    });

    if (existingRoll) {
      throw new Error("Roll number already exists.");
    }

    student.rollNumber = rollNumber;
  }

  student.name = name ?? student.name;
  student.phone = phone ?? student.phone;
  student.className = className ?? student.className;
  student.section = section ?? student.section;
  student.gender = gender ?? student.gender;
  student.address = address ?? student.address;
  student.parentName = parentName ?? student.parentName;
  student.parentPhone = parentPhone ?? student.parentPhone;

  await student.save();

  return await User.findById(student._id).select("-password");
};

// Delete Student
const deleteStudentService = async (studentId, user) => {
  const student = await User.findOne({
    _id: studentId,
    role: "student",
    institute: user.institute,
    isActive: true,
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  student.isActive = false;

  await student.save();

  return {
    message: "Student deleted successfully.",
  };
};

export {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
};
