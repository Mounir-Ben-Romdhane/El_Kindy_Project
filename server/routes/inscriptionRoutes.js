import express from "express";
import { getAll, addInscription, getInscriptionById, removeInscription, approveInscription, rejectInscription,getMostEnrolledCourse,studentsCount , getTopEnrolledCourses  } from '../controllers/inscriptionController.js';

const router = express.Router();

router.get("/all", getAll);
router.post("/add", addInscription)
router.delete("/delete/:id", removeInscription);
router.get("/:id", getInscriptionById);
// Route for approving inscription
router.patch('/:id/approve', approveInscription);

// Route for rejecting inscription
router.patch('/:id/reject', rejectInscription);


// Route to get the most enrolled course
router.get("/all/mostEnrolledCourse", getMostEnrolledCourse);

router.get("/all/TopEnrolledCourses", getTopEnrolledCourses);


// Route for getting the number of students enrolled in a course by its ID
router.get('/courses/:id/studentsCount', studentsCount);

export default router;