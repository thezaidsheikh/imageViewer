const mongoose = require('mongoose');
const articlesModel = require('./articles.model');
const Schema = mongoose.Schema;

// creating the schema for our User database model

let userComponentSchema = new Schema({

    userId:{
        type:String,
        required:true
    },
    route:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

var userComponentSchemaModel = mongoose.model('userComponent', userComponentSchema);

module.exports = userComponentSchemaModel;


