import express from "express";
import { login, getAllUsers,verify2FA } from "../controllers/auth.js"


const router = express.Router();


router.post("/login", login);
router.post("/verify2fa", verify2FA);
router.get('/getAll', getAllUsers);

export default router;