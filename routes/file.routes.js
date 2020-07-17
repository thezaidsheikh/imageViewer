const fileController = require('../controllers/file.controller');
const imageMiddleware = require('../middleware/uploadFile');
const checkToken = require('../middleware/checkApiToken');
const express = require('express');
var imageRoutes = express.Router();

var app = express();
// All routes used for files and here middlewares are used to check user authentication and other things

imageRoutes.post('/uploadFileImage', app.use(checkToken.checkApiToken), imageMiddleware.uploadFile.single('image'), fileController.uploadFileImage);
imageRoutes.get('/findAllImagesByUserId', app.use(checkToken.checkApiToken), fileController.findAllImageByUserId);
imageRoutes.delete('/deleteImageById', app.use(checkToken.checkApiToken), fileController.deleteImageById);

module.exports = imageRoutes;