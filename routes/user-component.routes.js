const userComponentController = require('../controllers/user-component.controller');
const express = require('express');
const uploadComponentMiddleware = require('../middleware/upload-component');
const checkToken = require('../middleware/checkApiToken');
var userComponentRouter = express.Router();

var app = express();

userComponentRouter.post('/createComponent', app.use(checkToken.checkApiToken), userComponentController.createComponent);
userComponentRouter.get('/getUserComponent', app.use(checkToken.checkApiToken), userComponentController.getAllUserComponent);
userComponentRouter.post('/createArticle', app.use(checkToken.checkApiToken), userComponentController.createArticle);

module.exports = userComponentRouter;