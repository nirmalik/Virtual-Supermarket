var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = new Schema({
    _id: Schema.Types.ObjectId,
    customer: [{ type: Schema.Types.ObjectId, ref: 'customers' }],
    dateCreated: Date
});

module.exports = mongoose.model('carts', Cart);