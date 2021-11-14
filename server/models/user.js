const mongoose = require('mongoose');
const { isEmail } = require('validator');

/* Schema dictates how the data will be structured in the DB*/
const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        /* Checks if email is valid*/
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm password']
    }
});


module.exports = mongoose.model('User', UserSchema);
