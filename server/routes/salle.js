import express from 'express';
import { create, list,update,remove } from '../controllers/salle.js'; 

const router = express.Router();

router.post("/salle/create", create);
router.get("/salles",list);
router.put("/salles/:id",update);
router.delete("/salles/:id",remove);

export default router;





