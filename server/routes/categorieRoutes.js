import express from "express";

import { createCategorie, getAllCategories, updateCategorie, deleteCategorie, getCategorieById } from "../controllers/categorieController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.put("/:id", updateCategorie);
router.delete("/:id", deleteCategorie);
router.get("/:id", getCategorieById);

export default router;
