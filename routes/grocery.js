const express = require('express');
const Grocery = require('../models/Grocery');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, itemName, expiryDate } = req.body;
    const newGrocery = new Grocery({ userId, itemName, expiryDate });
    await newGrocery.save();
    res.json({ message: "Grocery added successfully" });
});

router.get('/:userId', async (req, res) => {
    const groceries = await Grocery.find({ userId: req.params.userId });
    res.json(groceries);
});

module.exports = router;
