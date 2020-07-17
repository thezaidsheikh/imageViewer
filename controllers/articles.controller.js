const articlesModel = require('../models/articles.model');
const { Schema } = require('mongoose');


exports.createArticle = async (req, res) => {
    try {
        debugger
        var userId = req.headers.userid;
        var componentId = req.body.componentId;
        var articleHeading = req.body.articleHeading;
        var articleAuthor = req.body.articleAuthor;
        var htmlContent = req.body.htmlContent;
        if (!userId || !articleAuthor || !articleHeading || !componentId || !htmlContent) {
            res.json({ status: 444, msg: 'Please create an article in a component' });
        }
        else {
                var articlesObj = new articlesModel({
                    userId: userId,
                    componentId: componentId,
                    articleHeading:articleHeading,
                    articleAuthor:articleAuthor,
                    htmlContent:htmlContent
                })
                articlesObj.save(articlesObj ,(err, result) => {
                    if (err) res.status(400).json({ status: 400, msg: err });
                    res.status(200).json({ status: 200, msg: "Successfully created" });
                })
            }
    }
    catch (e) {
        res.status(444).json({ status: 444, msg: e });
    }

}