import express from "express";
import { getAll, addInscription, getInscriptionById, removeInscription, approveInscription, rejectInscription } from '../controllers/inscriptionController.js';
import { verifyToken } from "../middleware/auth.js";
import {addInscriptionWithPayment,Verifyinscription} from '../controllers/PaymentInscription.js';

const router = express.Router();

router.get("/all",verifyToken, getAll);
router.post("/add", addInscription);
router.delete("/delete/:id",verifyToken, removeInscription);
router.get("/:id",verifyToken, getInscriptionById);
// Route for approving inscription
router.patch('/:id/approve',verifyToken, approveInscription);

// Route for approving inscription with payment
router.patch("/:id/approvepayment",verifyToken,addInscriptionWithPayment );

// Route for verification inscription with payment
router.post("/payment/:id",Verifyinscription)

// Route for rejecting inscription
router.patch('/:id/reject',verifyToken,  rejectInscription);


export default router;