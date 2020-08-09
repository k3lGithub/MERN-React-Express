const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = '87CB9E5B-7C0B-4717-8D14-CCC3C41B6BBB'; //GUID

const findUserEmail = async (req) => {
    return await User.findOne({ email: req.body.email });
}

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allUsers
        });
    } catch (err) {
        res.status(503).send(err);
    }
});

// Register New User
router.post('/register', async (req, res) => {

    // let userExist = false;
    // userExist = await checkUserExist(req);
    // await console.log(userExist);
    const foundUser = await findUserEmail(req);

    // Validation: Do not create if same email exist
    if (foundUser) {

        // come back to setup proper error handling
        res.send("An account with this email exists. Please login or reset your password if you have forgotten.")
    } else {
        const pw = req.body.password;
        // Encrypt password
        const hashedPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(12));
        req.body.password = hashedPw;

        // Create user
        try {
            const createdUser = await User.create(req.body);
            console.log(createdUser, ' created user');
            res.status(200).send("User created successfully");
        } catch (err) {

            // come back to setup proper error handling
            res.status(404).send(err);
        }
    }
}
);


// Login
router.post('/login', async (req, res) => {

    // check if user exists
    try {
        const foundUser = await findUserEmail(req);
        // console.log(foundUser);

        // If the user exists use bcrypt to check if pw match
        if (foundUser) {

            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                console.log(foundUser.password);

                //sign a new JWT token
                const payload = {
                    id: foundUser._id,
                    user: foundUser.email
                };

                jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
                    res.set('token', token);
                    console.log(token);
                    res.status(200).send("Logged in");
                })
            } else {
                // req.session.message = 'Username or Password incorrect';
                
                res.status(401).send("Wrong password. Try again");
                res.redirect('/');
            }

        } else {
            res.status(400).send("Username or Password incorrect");
            //   res.redirect('/');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

//   // Logout - to be worked on
//   router.get('/logout', async(req, res) => {

//     req.session.destroy((err) => {
//         if(err){
//           res.send(err);
//         } else {
//           res.redirect('/');// back to the homepage
//         }
//       })

//   })

module.exports = router;