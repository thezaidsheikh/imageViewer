const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the schema for our User database model

let userRegisterSchema = new Schema({

    email: {
        type: String,
        required: true,
        max: 100
    },

    password: {
        type: String,
        required: true,
        max: 25
    },
    phone: {
        type: Number,
        required: false,
        maxlength: 10
    }
})

module.exports = mongoose.model('UserRegister', userRegisterSchema);
