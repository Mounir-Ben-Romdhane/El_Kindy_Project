import Classe from '../models/ClassModel.js';

export const createClass = async (req, res) => {
  try {
    const { className, students, teachers } = req.body;
    const newClass = await Classe.create({ className, students, teachers });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classe.find().populate('students teachers');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const updateData = req.body;
    const updatedClass = await Classe.findByIdAndUpdate(classId, updateData, { new: true });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const deletedClass = await Classe.findByIdAndDelete(classId);
    res.status(200).json({ message: "Class deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
