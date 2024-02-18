import express from "express";
const router = express.Router();
import {
  createStage,
  getStages,
  getStage,
  updateStage,
  deleteStage,
} from "../controllers/stageController.js";

router.get("/getStages", getStages);
router.get("/:id", getStage);
router.put("/:id", updateStage);
router.delete("/deleteStage/:id", deleteStage);

export default router;
