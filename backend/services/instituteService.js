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

  if (!instituteName || !directorName || !directorEmail || !password) {
    throw new Error("All required fields are mandatory.");
  }

  const existingDirector = await User.findOne({
    email: directorEmail.toLowerCase(),
  });

  if (existingDirector) {
    throw new Error("Director email already exists.");
  }

  const institute = await Institute.create({
    name: instituteName,
    email: directorEmail.toLowerCase(),
    phone,
    address,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const director = await User.create({
    name: directorName,
    email: directorEmail.toLowerCase(),
    password: hashedPassword,
    role: "director",
    institute: institute._id,
  });

  institute.director = director._id;
  await institute.save();

  const token = generateToken(director);

  return {
    institute,
    director,
    token,
  };
};

export { createInstitute };
