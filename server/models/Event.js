import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    text: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000,
    text: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  images: {
    type: Array,
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
}, { timestamps: true }); 

const Event = mongoose.model('Event', eventSchema);
export default Event;