import Course from '../models/Course.js';

export const getAll = async (req, res) => {
    try {
        let data = await Course.find();
        if (!data || !data.length) throw 'No courses found!';
        return res.status(200).json({success: true, data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const addNewCourse = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const {
            title,
            description,
            picturePath,
            courseCategory,
            courseLevel,
            courseTime,
            coursePrice
        } = req.body;

        const newCourse = new Course({
            title,
            description,
            picturePath,
            courseCategory,
            courseLevel,
            courseTime,
            coursePrice
        });

        const savedCourse = await newCourse.save();

        return res.status(201).json({
            success: true,
            id: savedCourse._id,
            message: "The course has been created!"
        });

    }catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
 
        const updatedCourse = await Course.findByIdAndUpdate(id, { $set: req.body }, { new: true });
 
        if (!updatedCourse) {
            return res.status(404).json({ success: false, error: "Course not found." });
        }
 
        return res.status(200).json({ success: true, data: updatedCourse});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
 };

 export const removeCourse = async (req, res) => {
    try {
        const { id } = req.params;
 
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, error: "Course not found." });
        }
 
        return res.status(200).json({ success: true, message: "Course deleted successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
 }
 
 export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};