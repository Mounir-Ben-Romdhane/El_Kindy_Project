
import Planning from "../models/Planning.js";

// Fonction pour ajouter un nouvel événement

export const addNewPlanning = async (req, res) => {

    try {
      // Chercher si l'événement existe déjà
      const existing = await Planning.findOne({
        start: req.body.start, 
        end: req.body.end,
        resourceId: req.body.resourceId,
        color: req.body.color

      });
      
      if(existing) {
        return res.status(409).json({message: "Event already exists"}); 
      }
  
      const planning = new Planning(req.body);
      await planning.save();
      return res.status(201).json(planning);
  
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  
  }
  export const getAllPlannings = async (req, res) => {
    try {
        const plannings = await Planning.find({});
        res.status(200).json(plannings);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const getPlanningsForTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId; // Assurez-vous que req.params.teacherId contient l'ID de l'enseignant
    const plannings = await Planning.find({ teacherId: teacherId });
    res.status(200).json(plannings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

