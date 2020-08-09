const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);