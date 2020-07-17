const mongoose = require('mongoose');

// connecting to the mongodb and creating the database

mongoose.connect('mongodb://localhost:27017/ImageProduct', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('DB connected succcessfully');
    }
    else {
        console.log("error: " + err)
    }
})

require('./image.model');
require('./userRegister.model');