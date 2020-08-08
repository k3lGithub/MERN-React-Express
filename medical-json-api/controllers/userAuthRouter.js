const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const checkUserExist = async(req) => {
        const findUser = await User.findOne({username: req.body.username});
        console.log(findUser, "finding userr");
    return true;
}

// Register New User
router.post('/register', async (req, res) => {

    let userExist = false;
    userExist = await checkUserExist(req);

    // Validation: Do not create if same username exist
    if (userExist == true) {
        res.send("Try another username.")
    } else{
        const pw = req.body.password;
        // Encrypt password
        const hasedPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
        req.body.password = hasedPw;
      
        // Create user
        try {
            const createdUser = await User.create(req.body);
            console.log(createdUser, ' created user');
            res.send("User created successfully");
        } catch (err){
          res.send(err)
        }
    }
  });

module.exports = router;