const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentRequestSchema = new Schema({
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateDemande: { type: Date, default: Date.now },
    statut: { type: String, enum: ['en attente', 'approuve', 'refuse'], default: 'en attente' }
});

module.exports = mongoose.model('AssignmentRequest', AssignmentRequestSchema);