import asyncHandler from "../utils/asyncHandler.js";
import { createInstitute } from "../services/instituteService.js";

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

export { registerInstitute };
