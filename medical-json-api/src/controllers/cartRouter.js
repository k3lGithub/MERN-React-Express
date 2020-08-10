const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/shoppingCart/cart');
const Product = require('../models/shoppingCart/product');
const { listIndexes } = require('../models/shoppingCart/cart');
const e = require('express');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

// Public Routes
router.get('/', async (req, res, next) => {
    try {
        const allCart = await Cart.find();

        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allCart
        });
    } catch (err) {
        res.status(503).send(err)
    }
});

// Authenticated Routes
// Later can refector to give option for non-users to use cart as well
router.use((req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, secretKey, { algorithms: ["HS256"] }, (err, decode) => {
        if (!err) {
            req.user = decode; //store user info on request object
            // console.log(decode);
            next(); //middleware complete, move to next endpoint
        }
        else {
            res.status(401).send('Please login');
        }
    })
})

// to be review once frontend payload is ready
router.post("/new", async (req, res) => {
    req.body.owner = req.user.userId;

    try {
        const cart = await Cart.findOne({owner: req.user.userId})
        console.log(cart)
        if(!cart){
            const data = await Cart.create(req.body);
            res.status(200).json(data);
        } else {
            res.status(401).json("Cart already exists");
        }
    } catch {
        res.status(400).send("bad request");
    }
});

// to be review once frontend payload is ready
router.post('/update', async (req, res) => {
    try {
        const cart = await Cart.findOne({owner: req.user.userId});
        // const product = await Product.findOne({_id: req.body.productId})
        const products = req.body.products;
        // console.log(res.body.products);
        if(cart){
            //loop through each item and push
            products.forEach(e => {
                cart.items.push(e);
            });
            // cart.items.push(products);
            const result = await cart.save(); //save to database
            res.status(200).json(result);
            console.log(result)
        } else {
            res.status(400).json("bad request. cart does not exist")
        }
    } catch {
        res.status(400).send("bad request");
    }
});



module.exports = router;