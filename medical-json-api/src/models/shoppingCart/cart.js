const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: false
    },
    items: [{
        // type: mongoose.Schema.ObjectId,
        productId: String,
        quantity: Number
    }]
});

module.exports = mongoose.model('Cart', CartSchema);