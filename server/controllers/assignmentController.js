import Assignment from "../models/Assignment.js";

// Créer une nouvelle assignment
export const createAssignment = async (req, res) => {
    try {
        console.log("Request received to create assignment");
        
        const {
            title,
            courseId,
            description
        } = req.body;

        const picturePath = req.file.path; // Accédez au chemin du fichier téléchargé

        console.log("Creating new assignment with title:", title);
        
        const newAssignment = new Assignment({
            title,
            courseId,
            picturePath,
            description
        });

        console.log("Saving new assignment to the database");
        
        const savedAssignment = await newAssignment.save();
        
        console.log("Assignment saved successfully:", savedAssignment);
        
        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fonction pour télécharger un fichier pour une tâche spécifique
export const uploadAssignmentFile = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId);
        
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        // Vérifiez s'il y a déjà un fichier associé à cette assignation
        if (assignment.filePath) {
            return res.status(400).json({ error: "A file is already uploaded for this assignment" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Enregistrez le chemin du fichier dans la base de données
        assignment.filePath = req.file.path;
        await assignment.save();

        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file for assignment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Obtenir toutes les assignments
export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
