const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');

/* Registration router */
router.post('/register', async (req, res) => {
    /*  res.send('Registered');*/

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // Crypto-JS for encryption
        password: CryptoJS.AES.encrypt(req.body.password,"randomieddsser").toString(),
        confirmPassword: CryptoJS.AES.encrypt(req.body.confirmPassword,"randomieddsser").toString()
        
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log('data saved');

    } catch (err) {
        res.status(500).json(err);
    }
});


/* Authenticate */
router.get('/authenticate', (req, res) => {
    res.send('Registered');
});

/* Login */
router.get('/login', (req, res) => {
    res.send('Registered');
});

/* validate */

router.get('/validate', (req, res) => {
    res.send('Registered');
});



module.exports = router;
