import express from "express";
import { getAll, removeCourse, getCourseById } from "../controllers/courseController.js";
import { verifyToken, verifyRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", verifyToken, verifyRoles(["superAdmin", "admin", "teacher"]), getAll);
router.delete("/delete/:id", removeCourse);
router.get("/:id", verifyToken, getCourseById);

export default router;