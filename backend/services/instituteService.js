import Institute from "../models/Institute.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ======================================================
// Create Institute
// ======================================================

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

// ======================================================
// Get Institute
// ======================================================

const getInstituteService = async (user) => {
  if (!user.institute) {
    throw new Error("Institute not found.");
  }

  const institute = await Institute.findOne({
    _id: user.institute,
    isActive: true,
  });

  if (!institute) {
    throw new Error("Institute not found.");
  }

  return institute;
};

// ======================================================
// Update Institute
// ======================================================

const updateInstituteService = async (data, user) => {
  if (!user.institute) {
    throw new Error("Institute not found.");
  }

  const institute = await Institute.findOne({
    _id: user.institute,
    isActive: true,
  });

  if (!institute) {
    throw new Error("Institute not found.");
  }

  const {
    name,
    email,
    phone,
    address,
    website,
    city,
    state,
    description,
    logo,
    primaryColor,
    secondaryColor,
  } = data;

  // Update fields only when provided

  if (name !== undefined) {
    if (!name.trim()) {
      throw new Error("Institute name cannot be empty.");
    }

    institute.name = name.trim();
  }

  if (email !== undefined) {
    if (!email.trim()) {
      throw new Error("Institute email cannot be empty.");
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate institute email
    const existingInstitute = await Institute.findOne({
      email: normalizedEmail,
      _id: { $ne: institute._id },
    });

    if (existingInstitute) {
      throw new Error("Institute email already exists.");
    }

    institute.email = normalizedEmail;
  }

  if (phone !== undefined) {
    institute.phone = phone.trim();
  }

  if (address !== undefined) {
    institute.address = address.trim();
  }

  if (website !== undefined) {
    institute.website = website.trim();
  }

  if (city !== undefined) {
    institute.city = city.trim();
  }

  if (state !== undefined) {
    institute.state = state.trim();
  }

  if (description !== undefined) {
    institute.description = description.trim();
  }

  if (logo !== undefined) {
    institute.logo = logo;
  }

  if (primaryColor !== undefined) {
    institute.primaryColor = primaryColor;
  }

  if (secondaryColor !== undefined) {
    institute.secondaryColor = secondaryColor;
  }

  await institute.save();

  return institute;
};

export { createInstitute, getInstituteService, updateInstituteService };
