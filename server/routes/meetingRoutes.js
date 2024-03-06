import express from 'express';
import { addMeeting } from '../controllers/meetingController.js';

const router = express.Router();

// Route pour ajouter une nouvelle réunion
router.post('/add', addMeeting);

export default router;
