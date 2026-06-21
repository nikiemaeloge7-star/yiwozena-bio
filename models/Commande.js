const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    nomClient: String,
    plats: [String], // Noms des repas commandés
    total: Number,
    statut: { type: String, default: 'En attente' }
});

module.exports = mongoose.model('Commande', CommandeSchema);