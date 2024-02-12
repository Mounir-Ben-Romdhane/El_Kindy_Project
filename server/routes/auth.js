import express from "express";
import { login, register, getAllUsers } from "../controllers/auth.js"

const router = express.Router();

router.post("/register",register);
router.post("/login", login);

router.get('/getAll', getAllUsers);

export default router;