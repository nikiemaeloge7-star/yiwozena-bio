const express = require('express');
const router = express.Router();
const Repas = require('./Repas'); // Assure-toi que le chemin est correct

// 1. Route pour récupérer tous les plats
router.get('/', async (req, res) => {
    try {
        const repas = await Repas.find();
        res.json(repas);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).json({ message: err.message });
    }
});

// 2. Route pour AJOUTER un plat (Celle qui te manquait !)
router.post('/add', async (req, res) => {
    try {
        const nouveauRepas = new Repas({
            nom: req.body.nom,
            prix: req.body.prix
        });
        const savedRepas = await nouveauRepas.save();
        res.status(201).json(savedRepas);
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
        res.status(500).json({ message: err.message });
    }
});

// 3. Route pour supprimer un plat
router.delete('/:id', async (req, res) => {
    try {
        await Repas.findByIdAndDelete(req.params.id);
        res.json({ message: "Repas supprimé" });
    } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        res.status(500).json({ message: err.message });
    }
});

// Cette ligne doit TOUJOURS être à la fin
module.exports = router;