const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the schema for our Image database model

let imageSchema = new Schema({

    userId: {
        type: String,
        required: true,
        max: 100
    },
    image: {
        type: Buffer,
    }
})

module.exports = mongoose.model('Image', imageSchema);
