const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');
const e = require('express');

// This middleware is to encrypt and decrypt the user password.

exports.encryptPassword = (req, res, next) => {
    
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) res.json({status:404, msg: "Your password and confirm password does not match." });
    else {
        bcrypt.hash(password, 0, (error, encrypted_pass) => {
            
            if (error) res.json({status:404, msg: "Something went wrong" });
            req.password = encrypted_pass;
            next();
        })
    }
}

exports.decryptPassword = (password, user_encrypted_pass, next) => {
    
    bcrypt.compare(password, user_encrypted_pass, (err, comparedData) => {
        if (err) next(err, null);
        else {
            if (comparedData == true) next(null, true);
            else next(null, false);
        }
    })

}