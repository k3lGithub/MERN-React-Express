const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Doctor = require('../models/service/doctor');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

const findDoctor = async (req) => {
    return await Doctor.findOne({ name: req.body.name });
}

router.get('/', async (req, res, next) => {
    try {
        const allDoctors = await Doctor.find();

        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allDoctors
        });
    } catch (err) {
        res.status(503).send(err)
    }
});

// Find Doctor by ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Doctor.findOne({ _id: req.params.id });
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("doctor not found");
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
            if (decode.user == "admin@admin.com") {
                next(); //middleware complete, move to next endpoint
            } else {
                res.status(401).send('You are not authorized to access this page');
            }
        }
        else {
            res.status(401).send('Please login');
        }
    })
})


router.post('/new', async (req, res) => {
    const foundDoctor = await findDoctor(req);

    // Validation check
    if (!foundDoctor) {
        try {
            const data = await Doctor.create(req.body);
            res.status(200).json(data);
        } catch {
            res.status(400).send("bad request");
        }
    } else {
        res.status(401).send("Doctor already exists. Go to update instead.")
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(data)
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("doctor not found");
        }
    } catch {
        res.status(400).send("bad request");
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Doctor.findByIdAndDelete(req.params.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("doctor not found");
        }
    } catch {
        res.status(400).send("bad request");
    }
});





module.exports = router;