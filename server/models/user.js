const mongoose = require('mongoose');

/* Schema dictates how the data will be structured in the DB*/
const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = mongoose.model('User', UserSchema);
