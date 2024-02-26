import mongoose from "mongoose";

const categorieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
      
    }, 
    picturePath: {
        type: String,
        default: "",
    }, 
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
}, { timestamps: true }); 

const Categorie = mongoose.model("Categorie", categorieSchema);

export default Categorie;
