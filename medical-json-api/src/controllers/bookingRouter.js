const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/service/booking');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

// Public Routes
router.get('/', async (req, res, next) => {
    try {
        const allBooking = await Booking.find();

        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allBooking
        });
    } catch (err) {
        res.status(503).send(err)
    }
});

// Authenticated Routes
// Later can refector to give option for non-users to book as well
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

router.post('/new', async (req, res) => {
    
        try {
            const booking = await Booking.findOne({owner: req.user.userId})
            if(!booking){
                req.body.owner = req.user.userId;
                console.log("Current User",req.user);
                console.log(req.body);
                const data = await Booking.create(req.body);
                console.log(data);
                res.status(200).json(data);
            } else {
                res.status(401).json("booking already exists. Cancel before booking another.")
            }

            
        } catch {
            res.status(400).send("bad request");
        }
});

// user selects doctor , date, time
// user click on book now
// call api > create new booking
// create new booking > saves to data and send back

    //userid
   // doctor id
   // date, time
   // generate auto booking id


module.exports = router;