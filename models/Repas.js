const mongoose = require('mongoose');

const RepasSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    description: String
});

// Sécurité pour éviter le double enregistrement
module.exports = mongoose.models.Repas || mongoose.model('Repas', RepasSchema);