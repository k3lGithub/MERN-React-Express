const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/shoppingCart/product');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjJlMzRkYTNiNTEyNDZiZGMzMDg3ZmMiLCJ1c2VyIjoidXNlcjFAdXNlci5jb20iLCJpYXQiOjE1OTY5Nzg0MzIsImV4cCI6MTU5Njk4MjAzMn0.RFjIsgE1erZlhNvHAoY5KCx2p5VLqc4ZJRiekKQF5h0

const findProduct = async (req) => {
    return await Product.findOne({ name: req.body.name});
}

// Public Routes
// Get all Products
router.get('/', async (req, res, next) => {
    try {
        const allProducts = await Product.find();

        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allProducts
        });
    } catch (err) {
        res.status(503).send(err)
    }
});

// Find Product by ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Product.findOne({_id: req.params.id});
        if (data) {
            res.status(200).json(data);
        } else{
            res.status(404).send("product not found");
        }  
    } catch {
        res.status(400).send("bad request");
    }   
});

// Authenticated Routes
router.use((req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, secretKey, { algorithms: ["HS256"] }, (err, decode) => {
        if (!err) {
            req.user = decode; //store user info on request object
            console.log(decode);
            next(); //middleware complete, move to next endpoint
        }
        else {
            res.status(401).send('Please login');
        }
    })
})

router.post('/new', async (req, res) => {
    const foundProduct = await findProduct(req);

    // Validation check
    if(!foundProduct){
        try {
            const data = await Product.create(req.body);
            res.status(200).json(data);
        } catch {
            res.status(400).send("bad request");
        }
    } else {
        res.status(401).send("Product already exists")
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).send("product not found");
        }
    } catch {
        res.status(400).send("bad request");
    }   
});

router.delete('/delete/:id', async (req, res) =>{
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).send("product not found");
        }
    } catch {
        res.status(400).send("bad request");
    }
});

module.exports = router;