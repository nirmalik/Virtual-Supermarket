var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    _id: Schema.Types.ObjectId,
    categoryName: String
});

module.exports = mongoose.model('categories', Category);