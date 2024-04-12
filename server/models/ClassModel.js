import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inscription', // Référence au modèle d'étudiant
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle de professeur
  }],
});

const Classe = mongoose.model('Classe', classSchema);

export default Classe;
