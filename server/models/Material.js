const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    intitule: String, // Ajoutez cette ligne
    type: String,
    etat: String,
    salle: String,
    organisation: { type: Boolean, default: false },
    utilisePar: { type: Schema.Types.ObjectId, ref: 'User' },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Material', MaterialSchema);
