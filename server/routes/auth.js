import express from "express";
import { login, register, getAllUsers, forgetPassord, resetPassord, verifyAccount } from "../controllers/auth.js"
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.post("/forgot-password", forgetPassord);
router.post("/reset-password/:id",verifyToken, resetPassord);
router.get("/verify-account/:id/verify",verifyToken,verifyAccount);

router.get('/getAll', getAllUsers);

export default router;