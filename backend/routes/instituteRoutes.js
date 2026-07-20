import express from "express";
import { registerInstitute } from "../controllers/instituteController.js";

const router = express.Router();

router.post("/", registerInstitute);

export default router;
