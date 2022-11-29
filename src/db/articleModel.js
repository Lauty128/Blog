const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: String,
    createdAt:Date,
    createdBy:String,
    image:String,
    imageContribution:String,
    category:String,
    content:String,
    views:Number
});
// creates the Schema

const Article = mongoose.model('article', articleSchema )
// creates the Model

module.exports = Article
// exports the Model