// models/Commande.js
const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: String,
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repas' }],
    total: Number,
    statut: { type: String, enum: ['En attente', 'En préparation', 'Terminé'], default: 'En attente' },
    date: { type: Date, default: Date.now }
});

const Repas = mongoose.models.Repas || mongoose.model('Repas', RepasSchema);

module.exports = Repas;