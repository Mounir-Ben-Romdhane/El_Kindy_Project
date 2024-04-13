import mongoose from 'mongoose';

const { Schema } = mongoose;

const GradeSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class', // You might have a Class model for classes, replace it accordingly
        required: true
    },
    lesson: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Grade = mongoose.model('Grade', GradeSchema);

export default Grade;
