import express from "express";
import { login, getAllUsers } from "../controllers/auth.js"

const router = express.Router();

router.post("/login", login);

router.get('/getAll', getAllUsers);

export default router;