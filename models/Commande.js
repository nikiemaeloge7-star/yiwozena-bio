const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    nomClient: String,
    plats: [String], // Noms des repas commandés
    total: Number,
    statut: { type: String, default: 'En attente' }
});

const Commande = mongoose.models.Commande || mongoose.model('Commande', CommandeSchema);

module.exports = Commande;