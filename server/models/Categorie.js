import mongoose from "mongoose";

const categorieSchema = mongoose.Schema({
    name: String,
    description: String,
}, { timestamps: true }); 

const Categorie = mongoose.model("Categorie", categorieSchema);

export default Categorie;
