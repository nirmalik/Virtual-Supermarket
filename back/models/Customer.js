var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Customer = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    familyName: String,
    username: String,
    password: String,
    customerid: Number,
    city: String,
    street: String
});
Customer.plugin(passportLocalMongoose);
module.exports = mongoose.model('customers', Customer);