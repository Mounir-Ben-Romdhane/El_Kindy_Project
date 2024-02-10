import Categorie from "../models/Categorie.js";

export const createCategorie = async (req, res) => {
    const newCategorie = new Categorie(req.body);

    try {
        await newCategorie.save();
        res.status(201).json(newCategorie);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getCategorieById = async (req, res) => {
    const { id } = req.params;

    try {
        const categorie = await Categorie.findById(id);
        if (!categorie) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateCategorie = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedCategorie = await Categorie.findByIdAndUpdate(id, { name, description }, { new: true });
        res.json(updatedCategorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategorie = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategorie = await Categorie.findByIdAndDelete(id);
        if (!deletedCategorie) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
