import express from "express";
import { addNewPlanning , getAllPlannings , getPlanningsForTeacher } from "../controllers/planningController.js";

const router = express.Router();

// Route pour ajouter un nouvel événement
router.post("/add", addNewPlanning);
router.get("/all" , getAllPlannings);
router.get("/teacher/:teacherId", getPlanningsForTeacher);

export default router;