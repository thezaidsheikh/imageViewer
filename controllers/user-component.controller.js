const userComponentModel = require('../models/user-component.model');
const { Schema } = require('mongoose');
const articlesModel = require('../models/articles.model');
// create user component API
exports.createComponent = async (req, res) => {
    try {
        debugger
        var userId = req.headers.userid;
        var componentName = req.body.name;
        var route = req.body.route;
        if (!userId || !componentName || !route) {
            res.json({ status: 444, msg: 'Please insert all the fields' });
        }
        else {
            let resolve = await checkIfComponentAlreadyExist(componentName, userId, route);

            if (resolve != "component_err" && resolve != "route_err") {
                var userComponentObj = new userComponentModel({
                    userId: userId,
                    name: componentName,
                    route: route,
                })
                userComponentObj.save(userComponentObj, (err, result) => {

                    if (err) res.status(400).json({ status: 400, msg: err });
                    res.status(200).json({ status: 200, msg: "Successfully created" });

                })
            }
            if (resolve == 'component_err') {
                res.json({ status: 400, msg: "This Component is already exist , please change the name and try again" });
            }
            if (resolve == 'route_err') {
                res.json({ status: 400, msg: "This route is already exist , please change the route and try again" });
            }
        }
    }
    catch (e) {
        res.status(444).json({ status: 444, msg: e });
    }

}

// ------------------------------------------------------------------- END --------------------------------------------------------------------


// get all user component API

exports.getAllUserComponent = (req, res) => {
    try {
        const userId = req.query.userId;
        userComponentModel.aggregate([
            {$lookup:{ from: 'articlescomponents', localField:'_id', 
              foreignField:"componentId",as:'articles'}},
        ]).exec((err, result)=>{
             debugger
            if (err) {
                res.json({ status: 400, msg: err });
            }
            if (result) {
                res.status(200).json({ status: 200, data: result })
            }
        });
        // userComponentModel.find({ userId: userId }, (err, found) => {

        //     if (err) res.json({ status: 400, msg: err });
        //     else res.status(200).json({ status: 200, data: found })
        // })
    }
    catch (e) {
        res.json({ status: 400, msg: "Something wents wrong" });
    }
}

// ------------------------------------------------------------------- END --------------------------------------------------------------------


exports.createArticle = async (req, res) => {
    try {
        debugger
        var userId = req.headers.userid;
        var componentId = req.body.componentId;
        var componentName = req.body.name;
        var route = req.body.route;
        var articleHeading = req.body.articles.articleHeading;
        var articleAuthor = req.body.articles.articleAuthor;
        if (!userId || !componentName || !route || !articleAuthor || !articleHeading || !componentId) {
            res.json({ status: 444, msg: 'Please create an article in a component' });
        }
        else {
                var userComponentObj = new userComponentModel({
                    userId: userId,
                    name: componentName,
                    route: route,
                    articles:{
                        articleHeading:articleHeading,
                        articleAuthor:articleAuthor
                    }
                })
                userComponentObj.update({_id:componentId},{userComponentObj} ,(err, result) => {
                    if (err) res.status(400).json({ status: 400, msg: err });
                    res.status(200).json({ status: 200, msg: "Successfully created" });
                })
            }
    }
    catch (e) {
        res.status(444).json({ status: 444, msg: e });
    }

}

var checkIfComponentAlreadyExist = function (name, userId, route) {

    return new Promise((resolve, reject) => {

        userComponentModel.find({ userId: userId, name: { $regex: new RegExp("^" + name + "$", "i") } }, (err, found) => {

            if (found.length > 0) {
                resolve('component_err');
            }
            else {
                userComponentModel.find({ userId: userId, route: { $regex: new RegExp("^" + route + "$", "i") } }, (err, result) => {

                    if (result.length > 0) {
                        resolve('route_err');
                    }
                    else resolve(result);
                })
            }
        })
    })
}