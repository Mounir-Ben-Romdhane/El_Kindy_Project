import express from 'express';
import { getAssignments } from "../controllers/assignmentController.js";

const router = express.Router();

// Route pour créer une nouvelle assignment
//router.post('/add', createAssignment);

// Route pour obtenir toutes les assignments
router.get('/assignments', getAssignments);

// Route pour télécharger un fichier pour une tâche spécifique

export default router;
