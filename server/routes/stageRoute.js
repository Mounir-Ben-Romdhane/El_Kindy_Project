import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";

import {
  createStage,
  getStages,
  getStage,
  updateStage,
  deleteStage,
} from "../controllers/stageController.js";

router.get("/",verifyToken, getStages);
router.get("/:id",verifyToken, getStage);
router.patch("/:id",verifyToken, updateStage);
router.delete("/:id",verifyToken, deleteStage);

export default router;
