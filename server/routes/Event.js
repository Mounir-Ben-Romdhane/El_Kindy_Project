import express from 'express';
import { create, list,update,remove,uploadEvent } from '../controllers/event.js'; 

const router = express.Router();

router.post("/event/create", create);
router.get("/events", list);
router.put("/events/:id",update);
router.delete("/events/:id",remove);
router.post("/upload",uploadEvent)

export default router;