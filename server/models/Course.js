import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max:50,
        }, 
        description:{
            type:String,
            required:true,
        },
        duration:{
            weeks: {
                type: Number,
                required: true,
            },
            days: {
                type:Number
            }  
        },
    },
    { timestamps: true}
    );

    const Course = mongoose.model("Course",CourseSchema);
    export default Course;