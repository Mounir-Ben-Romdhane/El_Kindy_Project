import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    ordre: {
      type: Number,
      required: true,
      unique: true, // Ensure ordre is unique
      validate: {
        validator: async function(value) {
          const count = await this.constructor.countDocuments({ ordre: value });
          return count === 0; // Return true if no documents with the same ordre are found
        },
        message: 'ordre must be unique.', // Custom error message
      },
    },
  },
  {
    strictPopulate: false, // Allow populating fields not defined in the schema
  }
);

const Classe = mongoose.model('Classe', classSchema);

export default Classe;
