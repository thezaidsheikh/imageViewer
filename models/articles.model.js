const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the schema for our User database model

let artilceSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    articleHeading:{
        type:String,
        required:true
    },
    articleAuthor:{
        type:String,
        required:true
    },
    htmlContent:{
        type:String,
        required:true
    },
    componentId:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

var articlesSchemaModel = mongoose.model('articlesComponent', artilceSchema);

module.exports = articlesSchemaModel;