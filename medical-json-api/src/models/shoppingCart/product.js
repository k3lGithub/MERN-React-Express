const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
