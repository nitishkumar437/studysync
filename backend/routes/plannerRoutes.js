import express from "express";
import {
  createPlanner,
  getPlanners,
  updatePlanner,
  deletePlanner,
  togglePlannerStatus,
} from "../controllers/plannerController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/").post(createPlanner).get(getPlanners);

router.route("/:id").put(updatePlanner).delete(deletePlanner);

router.patch("/:id/status", togglePlannerStatus);

export default router;
