import Event from "../models/Event.js";


// Get Event by ID
export async function getById(req, res) {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Not Found", message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Could not retrieve event",
    });
  }
}

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
export async function update(req, res) {
  const eventId = req.params.id;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not update event",
      });
  }
}

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


/* // upload Event Image
export async function uploadEvent(req, res) {
  try {
    upload(req,res,async(err)=>{
      if(err){
        res.status(500).send("Error uploading file");
      }else{
        res.status(200).send(req.file);
      }
    })
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not upload file",
      });
  }
}  */

export const addNewEvent = async (req, res) => {
  try {
      console.log('Request Body:', req.body);
      const {
        title,
        description,
        price,
        images,
        dateDebut,
        dateFin,
      } = req.body;

      const newEvent = new Event({
        title,
        description,
        price,
        images,
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