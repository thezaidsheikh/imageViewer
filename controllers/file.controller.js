const imageModel = require('../models/image.model');
const express = require('express');
const fs = require('fs');
var app = express();

// this function will upload the image in our database

exports.uploadFileImage = (req, res) => {
    const file = req.file
    console.log("file", file);

    try {
        
        if (req.error != undefined || req.error != null) {
            res.status(400).json('File type not supported');
        }
        else {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var finalImg = Buffer.from(encode_image, 'base64')
            var ImageModelObject = new imageModel();
            ImageModelObject.userId = req.body.userId;
            ImageModelObject.image = finalImg;
            ImageModelObject.save((err, doc) => {
                console.log("doc", doc);
                if (!err) {
                    res.status(200).json({ status: 200, msg: "Inserted successfully" });
                }
                else {
                    res.status(400).json('Error in insertion :' + err);
                }
            })
        }
    }
    catch (e) {
        res.status(400).json('Error in insertion :' + e);
    }
}
// ------------------------------END of the function------------------------------


// this function will find all the images of a particular user.

exports.findAllImageByUserId = (req, res) => {
    try {
        
        var currentUserId = req.userId;
        console.log(currentUserId);

        var find = imageModel.find({ userId: currentUserId }, (err, result) => {
            app.get('savedImages/')
            if (err) console.log(err);
            else {
                res.send(result[0].image)
                if (result.length > 0) res.status(200).json({ status: 200, msg: result });
                else console.log('no images found');
            }
        })
    }
    catch (e) {
        res.status(400).json('Error in insertion :' + e);
    }
}
// ------------------------------END of the function------------------------------


// this function will delete the image of a particular user.

exports.deleteImageById = (req, res) => {
    try {
        

        var currentImageId = req.query.id;
        console.log(currentImageId);

        var dleteImage = imageModel.deleteOne({ "_id": currentImageId }, (err, result) => {
            
            if (err) console.log(err);
            else {
                if (result.length > 0) res.status(200).json({ status: 200, msg: result });
                else console.log('no images found');
            }
        })
    }
    catch (e) {
        res.status(400).json('Error in insertion :' + e);
    }
}
// ------------------------------END of the function------------------------------
