const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const notifier = require('node-notifier');

/* Handle errors */
const handleErrors = (err) => {
    let errors = {firstName: '', lastEmail: '',email: '', password: '' }

    /* Duplicate email error */
    if(err.code === 11000) {
        errors.email = 'Email is already registered';
        notifier.notify('Email is already registered');

        return errors;
    }
    /* Validation errors*/
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
            notifier.notify(properties.message);
        });
    }
return errors;
}

/* Registration user logic*/

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
        notifier.notify(err);
    }
}

// user login logic
module.exports.login_post = async (req, res) => {

    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(401).json('Wrong credentials');
            notifier.notify({
                title: 'Error!',
                message: 'Wrong credentials'
            });
        
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const password_ = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(password_ !== req.body.password) {
            res.status(401).json('Wrong password!');
            notifier.notify({
                title: 'Error!',
                message: 'Wrong password or email'
            });
            
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

        notifier.notify(err);

    }

}

// Update user logic
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

        notifier.notify({
            title: 'Error!',
            message: err
        });
    }
}

// delete user logic 
module.exports.deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');

    }catch(err) {
        res.status(500).json(err);
        console.log(err.toString());
        notifier.notify({
            title: 'Error!',
            message: err
        });
    }
}
// Get user
module.exports.getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        // never reveal password to user, even if it's hashed.
        const { password,confirmPassword, ...others} = user._doc;
        res.status(200).json({...others});

    }catch(err) {
        res.status(500).json(err);
        console.log(err.toString());
        notifier.notify({
            title: 'Error!',
            message: err
        });
    }
}
