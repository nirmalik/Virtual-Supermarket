var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItem = new Schema({
    _id: Schema.Types.ObjectId,
    product: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    quantity: Number,
    totalPrice: Number,
    cart: [{ type: Schema.Types.ObjectId, ref: 'carts' }]
});

module.exports = mongoose.model('cartitems', CartItem);