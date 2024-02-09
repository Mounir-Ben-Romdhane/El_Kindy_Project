import express from "express";
import { getAll, addNewCourse, updateCourse, removeCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get("/all", getAll);
router.post("/add", addNewCourse);
router.patch("/update/:id", updateCourse);
router.delete("/delete/:id", removeCourse);

export default router;