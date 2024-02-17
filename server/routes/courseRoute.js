import express from "express";
import { getAll, addNewCourse, updateCourse, removeCourse } from "../controllers/courseController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/all",verifyToken , getAll);
router.patch("/update/:id", updateCourse);
router.delete("/delete/:id", removeCourse);

export default router;