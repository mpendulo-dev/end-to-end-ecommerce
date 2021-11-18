const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


/* Handle errors */
const handleErrors = (err) => {
    let errors = {firstName: '', lastEmail: '',email: '', password: '' }

    /* Duplicate email error */
    if(err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }
    /* Validation errors*/
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
return errors;
}

/* create JWT-function */
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ENC, {
        expiresIn: maxAge
    });
};
/* Registration user logic*/
module.exports.register_get = (req, res) => {

}
module.exports.register_post = async (req, res) => {

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // Crypto-JS for encryption
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString(),
        confirmPassword: CryptoJS.AES.encrypt(req.body.confirmPassword,process.env.PASS_SECRET).toString()

    });

    try {
        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({savedUser: savedUser._id});

        console.log('data saved');

    } catch (err) {
        const errors = handleErrors(err);
       res.status(400).json(errors);
    }
}
module.exports.login_get = (req, res) => {

}
module.exports.login_post = (req, res) => {

}
