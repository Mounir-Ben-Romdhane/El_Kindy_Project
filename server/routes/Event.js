import express from 'express';
import {  list,update,remove,getById } from '../controllers/event.js'; 

const router = express.Router();


router.get("/events", list);
router.put("/events/:id",update);
router.delete("/events/:id",remove);
router.get("/events/:id",getById);


export default router;