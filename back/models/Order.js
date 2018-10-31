var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = new Schema({
    _id: Schema.Types.ObjectId,
    customer: [{ type: Schema.Types.ObjectId, ref: 'customers' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'carts' }],
    totalPrice: Number,
    city: String,
    street: String,
    shippingDate: Date,
    dateOrdered: Date,
    paymentDigits: Number
});

module.exports = mongoose.model('orders', Order);