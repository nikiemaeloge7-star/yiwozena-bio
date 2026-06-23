require('dotenv').config(); // Charge les variables secrètes
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Connexion à MongoDB (utilise la variable d'environnement MONGODB_URI)
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ma_plateforme";

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connexion MongoDB réussie et stable !"))
    .catch(err => console.error("❌ Erreur MongoDB :", err));

// --- MODÈLES (Assure-toi que ces fichiers existent dans ton dossier /models) ---
// Correction ici : on importe Repas et Commande
const Repas = require('./models/Repas'); 
const Commande = require('./models/Commande');

// --- ROUTES API ---
app.get('/api/repas', async (req, res) => {
    try {
        const repas = await Repas.find();
        res.json(repas);
    } catch (err) { res.status(500).send(err); }
});

app.post('/api/repas/add', async (req, res) => {
    try {
        const nouveauRepas = new Repas(req.body);
        await nouveauRepas.save();
        res.status(201).json(nouveauRepas);
    } catch (err) { res.status(500).send(err); }
});

app.delete('/api/repas/:id', async (req, res) => {
    try {
        await Repas.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Repas supprimé" });
    } catch (err) { res.status(500).send(err); }
});

// --- ROUTES COMMANDES ---
app.post('/api/commandes', async (req, res) => {
    try {
        const nouvelleCommande = new Commande(req.body);
        await nouvelleCommande.save();
        res.status(201).json(nouvelleCommande);
    } catch (err) { res.status(500).send(err); }
});

app.get('/api/commandes', async (req, res) => {
    try {
        const commandes = await Commande.find().sort({date: -1});
        res.json(commandes);
    } catch (err) { res.status(500).send(err); }
});

// --- PAGES ---
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/gerant', (req, res) => res.sendFile(__dirname + '/admin.html'));

const PORT = process.env.PORT || 7860;
app.listen(PORT, () => {
    console.log(`🚀 Yiwozena Bio lancé sur le port ${PORT}`);
});