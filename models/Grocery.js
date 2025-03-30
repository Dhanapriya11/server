const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    userId: String,
    itemName: String,
    expiryDate: Date
});

module.exports = mongoose.model("Grocery", GrocerySchema);
