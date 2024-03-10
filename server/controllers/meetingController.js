import Meeting from "../models/Meeting.js";
// Ajouter une nouvelle réunion
export const addMeeting = async (req, res) => {
  try {
    const { startTime, endTime, meetingLink, students } = req.body;

    // Créer une nouvelle instance de la réunion
    const newMeeting = new Meeting({
      startTime,
      endTime,
      meetingLink,
      students
    });

    // Enregistrer la réunion dans la base de données
    const savedMeeting = await newMeeting.save();

    // Répondre avec la nouvelle réunion ajoutée
    res.status(201).json(savedMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la réunion', error: error.message });
  }
};
// Fetch all meetings
export const getAllMeetings = async (req, res) => {
  try {
    // Query the database to get all meetings
    const meetings = await Meeting.find();

    // Respond with the list of meetings
    res.status(200).json({ data: meetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réunions', error: error.message });
  }
};