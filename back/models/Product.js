var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Product = new Schema({
    _id: Schema.Types.ObjectId,
    productName: String,
    productPrice: Number,
    productImage: String,
    category: { type: Schema.Types.ObjectId, ref: 'categories' }
});

module.exports = mongoose.model('products', Product);