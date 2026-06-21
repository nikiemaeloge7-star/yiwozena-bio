const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');

router.post('/', async (req, res) => {
    const nouvelleCommande = new Commande(req.body);
    await nouvelleCommande.save();
    res.status(201).json(nouvelleCommande);
});

router.get('/', async (req, res) => {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
});

module.exports = router;