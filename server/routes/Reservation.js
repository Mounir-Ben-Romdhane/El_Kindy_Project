import express from 'express';
import { createReservation, listReservationsByid,listReservations,updateReservationStatus ,deleteReservation  } from '../controllers/reservationController.js';


const router = express.Router();

router.post("/:eventId/reservation", createReservation);
router.get("/reservation/:eventId", listReservationsByid);
router.get("/reservations", listReservations);
router.patch('/reservations/:reservationId', updateReservationStatus);
router.delete('/reservations/:reservationId', deleteReservation);




export default router;