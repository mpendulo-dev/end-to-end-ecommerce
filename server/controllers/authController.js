const User = require('../models/user');
const CryptoJS = require('crypto-js');

/* Registration user logic*/
module.exports.register_get = (req, res) => {

}
module.exports.register_post = async (req, res) => {

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
}
module.exports.login_get = (req, res) => {

}
module.exports.login_post = (req, res) => {

}
