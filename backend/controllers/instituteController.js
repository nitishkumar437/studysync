import asyncHandler from "../utils/asyncHandler.js";

import {
  createInstitute,
  getInstituteService,
  updateInstituteService,
} from "../services/instituteService.js";

// ======================================================
// Register Institute
// ======================================================

const registerInstitute = asyncHandler(async (req, res) => {
  const result = await createInstitute(req.body);

  res.status(201).json({
    success: true,
    message: "Institute registered successfully.",
    token: result.token,
    institute: result.institute,
    user: {
      _id: result.director._id,
      name: result.director.name,
      email: result.director.email,
      role: result.director.role,
    },
  });
});

// ======================================================
// Get Institute
// ======================================================

const getInstitute = asyncHandler(async (req, res) => {
  const institute = await getInstituteService(req.user);

  res.status(200).json({
    success: true,
    institute,
  });
});

// ======================================================
// Update Institute
// ======================================================

const updateInstitute = asyncHandler(async (req, res) => {
  const institute = await updateInstituteService(req.body, req.user, req.file);

  res.status(200).json({
    success: true,
    message: "Institute settings updated successfully.",
    institute,
  });
});

export { registerInstitute, getInstitute, updateInstitute };
