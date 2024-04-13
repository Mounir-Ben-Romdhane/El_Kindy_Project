import express from "express";
import { login, register,refreshToken, getAllUsers, forgetPassord, resetPassord, verifyAccount,getUser,getAllUserByRole,getAllStudents,addGrades } from "../controllers/auth.js"
import { verifyToken } from '../middleware/auth.js';
import googleAuth from "../controllers/googleAuth.js";
import { facebooklogin } from "../controllers/passport-facebook.js";


const router = express.Router();
router.get('/:id',verifyToken, getUser);

router.post("/register",register);
router.post("/login", login);
router.post("/refresh-token", refreshToken); // New route for refresh token
router.post("/forgot-password", forgetPassord);
router.post("/reset-password/:id",verifyToken, resetPassord);
router.get("/verify-account/:id/verify",verifyToken,verifyAccount);
router.post("/facebooklogin", facebooklogin); 
router.get('/getAll', verifyToken,getAllUsers);
router.post("/googleAuth", googleAuth);
router.get('/getAllUserByRole/:role', verifyToken,getAllUserByRole);
router.get('/students', getAllStudents);
router.post('/grades', addGrades);

export default router;