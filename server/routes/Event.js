import express from 'express';
import {  list,remove,updateEvent,getEventById} from '../controllers/event.js'; 

const router = express.Router();


router.get("/events", list);
router.put("/:id", updateEvent);
router.delete("/events/:id",remove);
router.patch("/update/:id", updateEvent);
router.get("/events/:id", getEventById);


export default router;