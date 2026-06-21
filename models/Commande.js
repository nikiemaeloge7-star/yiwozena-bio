const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client: String,
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repas' }],
    total: Number,
    statut: { type: String, enum: ['En attente', 'En préparation'], default: 'En attente' },
    date: { type: Date, default: Date.now }
});

// Utilisation du modèle sécurisé pour éviter l'OverwriteModelError
const Commande = mongoose.models.Commande || mongoose.model('Commande', CommandeSchema);

module.exports = Commande;