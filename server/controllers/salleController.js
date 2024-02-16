import Salle from "../models/Salle.js";

export async function create(req, res) {
  try {
    const { numero, capacity, status} = req.body;
    const newSalle = new Salle({
        numero,
        capacity,
        status,
    });
    const savedSalle = await newSalle.save();
    res.status(201).json({ savedSalle });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation Error", message: err.message });
    }
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not create salle",
      });
  }
}

// Get All salles
export async function list(req, res) {
  try {
    let salles = await Salle.find({});
    res.json(salles);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not retrieve salles",
      });
  }
}

// Edit salle
export async function update(req, res) {
  const salleId = req.params.id;
  try {
    const updatedSalle = await Salle.findByIdAndUpdate(salleId, req.body, {
      new: true,
    });
    if (!updatedSalle) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "salle not found" });
    }
    res.json(updatedSalle);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not update salle",
      });
  }
}

// Delete salle
export async function remove(req, res) {
  const salleId = req.params.id;
  try {
    const deletedSalle = await Salle.findByIdAndDelete(salleId);
    if (!deletedSalle) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "salle not found with this id" });
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "Could not delete salle",
      });
  }
}
