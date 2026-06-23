const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: String,
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repas' }],
    total: Number,
    statut: { type: String, enum: ['En attente', 'En préparation', 'Livré'], default: 'En attente' },
    date: { type: Date, default: Date.now }
});

// Sécurité pour éviter le double enregistrement
module.exports = mongoose.models.Commande || mongoose.model('Commande', CommandeSchema);