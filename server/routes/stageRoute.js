import express from "express";
const router = express.Router();
import {
  createStage,
  getStages,
  getStage,
  updateStage,
  deleteStage,
} from "../controllers/stageController.js";

router.post("/createStage", createStage);
router.get("/", getStages);
router.get("/:id", getStage);
router.put("/updateStage/:id", updateStage);
router.delete("/deleteStage/:id", deleteStage);

export default router;
