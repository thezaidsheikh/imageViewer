const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/encrypt_decrypt_pass');
const express = require('express');
const userRoutes = express.Router();

var app = express();
// All routes used for users and here middlewares are used to check user authentication and other things

userRoutes.post('/register', app.use(userMiddleware.encryptPassword), userController.register);
userRoutes.post('/login', userController.login);


module.exports = userRoutes;