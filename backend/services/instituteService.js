import Institute from "../models/Institute.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const createInstitute = async (data) => {
  const {
    instituteName,
    directorName,
    directorEmail,
    password,
    phone,
    address,
  } = data;

  // Validate required fields
  if (!instituteName || !directorName || !directorEmail || !password) {
    throw new Error("All required fields are mandatory.");
  }

  // Normalize email
  const email = directorEmail.toLowerCase().trim();

  // Check if institute already exists
  const existingInstitute = await Institute.findOne();

  if (existingInstitute) {
    throw new Error("Institute is already registered. Please login.");
  }

  // Check if a director already exists
  const existingDirector = await User.findOne({
    role: "director",
    isActive: true,
  });

  if (existingDirector) {
    throw new Error("Director already exists.");
  }

  // Check duplicate email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Institute
  const institute = await Institute.create({
    name: instituteName.trim(),
    email,
    phone: phone?.trim() || "",
    address: address?.trim() || "",
  });

  // Create Director
  const director = await User.create({
    name: directorName.trim(),
    email,
    password: hashedPassword,
    role: "director",
    institute: institute._id,
  });

  // Link Director to Institute
  institute.director = director._id;
  await institute.save();

  // Generate JWT
  const token = generateToken(director);

  return {
    institute,
    director: {
      _id: director._id,
      name: director.name,
      email: director.email,
      role: director.role,
      institute: director.institute,
    },
    token,
  };
};

export { createInstitute };
