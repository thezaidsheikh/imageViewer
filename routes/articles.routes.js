const articlesController = require('../controllers/articles.controller');
const express = require('express');
const checkToken = require('../middleware/checkApiToken');
var articlesRouter = express.Router();

var app = express();

articlesRouter.post('/createArticles', app.use(checkToken.checkApiToken), articlesController.createArticle);

module.exports = articlesRouter;