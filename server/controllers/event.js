import Event from "../models/Event.js";



// Get All Events
export async function list(req, res) {
  try {
    let events = await Event.find({});
    res.json(events);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not retrieve events",
      });
  }
}

// Edit Event
export const updateEvent = async (req, res) => {
  try {
      const { id } = req.params;
      let updateData = req.body; // Assuming req.body contains the fields to update

      // Log the received file data
      console.log("Received file:", req.file);

      // If a file is uploaded, add its path to updateData
      if (req.file) {
          console.log("File path:", req.file.path);
          // Remove the 'public/assets/' prefix from the file path
          updateData.picturePath = req.file.path.replace('public/assets/', '');
      }
      
      // Log the updateData to verify its content
      console.log("Update data:", updateData);

      // Update the category with the given ID
      const updateEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
     
      if (!updateEvent) {
          return res.status(404).json({ success: false, error: "Event not found." });
      }

      return res.status(200).json({ success: true, data: updateEvent });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err.message });
  }
};

// Delete Event
export async function remove(req, res) {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Event not found with this id" });
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not delete event",
      });
  }
}


export const addNewEvent = async (req, res) => {
  try {
      console.log('Request Body:', req.body);
      const {
        title,
        description,
        price,
        picturePath,
        dateDebut,
        dateFin,
      } = req.body;


      

      const newEvent = new Event({
        title,
        description,
        price,
        picturePath,
        dateDebut,
        dateFin,
      });

     

      const savedEvent = await newEvent.save();

      return res.status(201).json({
          success: true,
          id: savedEvent._id,
          message: "The Event has been created!"
      });

  }catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: err.message });
  }
};

export const getEventById = async (req,res)=>{
  try{
    const eventId = req.params.id;
    const event = await Event.findById(eventId); 
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
  }
  res.status(200).send(event);
  }catch (error) {
    res.status(500).send({ message: "Error fetching event details", error: error.message });
}
}


