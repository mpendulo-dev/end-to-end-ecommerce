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
        console.log(savedUser);
        res.status(201).json(savedUser);

        console.log('data saved');

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}
module.exports.login_get = (req, res) => {

}
module.exports.login_post = async (req, res) => {

    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(401).json('Wrong credentials');
        
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const password_ = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(password_ !== req.body.password) {
            res.status(401).json('Wrong password!');
            
        }
        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin
        }, process.env.JWT_ENC,
        {expiresIn: "3d"}
        );

        // never reveal password to user, even if it's hashed.
        const { password,confirmPassword, ...others} = user._doc;
        res.status(200).json({...others, accessToken});

    

    } catch(err) {

        res.status(500).json(err);
    

    }

}
module.exports.updateUser = async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
            {new: true}
        );
        res.status(200).json(updatedUser);

    }catch(err) {
        res.status(500).json(err);
    }
}