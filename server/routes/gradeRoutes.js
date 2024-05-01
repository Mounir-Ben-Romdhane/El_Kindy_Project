import express from "express";
import {affectGrade,getGrades,getGradesByCourseAndClass,getGradesByStudentAndCourse} from "../controllers/grade.js";

const router = express.Router();
//route for affectGrade
router.post("/affectGrade", affectGrade);
//route for getGrades
router.get("/getGrades", getGrades);
//route for getGradesByCourseAndClass
router.get("/getGradesByCourseAndClass/:courseId/:classId", getGradesByCourseAndClass);
//route for getGradesByStudentAndCourse
router.get("/getGradesByStudentAndCourse/:studentId/:courseId", getGradesByStudentAndCourse);

export default router;