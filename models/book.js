// board.js
var mongoose = require('mongoose');
var db = require('./db');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var bookSchema = new Schema({
    bookname: String,
    author: String,
    publisher: String,
    publisher_year: Number,
    image: String
});

var bookModel = db.model('book', bookSchema);


module.exports = {
    bookModel: bookModel,
    bookSchema: bookSchema
};
