import express from 'express';
import { create, list,update,remove } from '../controllers/salleController.js'; 

const router = express.Router();

router.post("/", create);
router.get("/",list);
router.put("/:id",update);
router.delete("/:id",remove);

export default router;
