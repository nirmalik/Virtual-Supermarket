var express = require('express');
var router = express.Router();
var Cart = require('../models/Cart');
var Customer = require('../models/Customer');
var CartItem = require('../models/CartItem');
var Product = require('../models/Product');
var mongoose = require('mongoose');


router.get('/getAllCartItems/:_id', function (req, res, next) {
    var cartID = req.params._id;
    CartItem.find({ cart: cartID }).populate('product', 'productName productImage').exec((err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
router.post('/createCart', function (req, res, next) {
    var newCart = new Cart({
        _id: new mongoose.Types.ObjectId(), customer: req.body._id,
        dateCreated: new Date()
    });
    Cart.collection.insert(newCart, (err) => {
        if (err) throw err;
        res.json(newCart);
    });
});

router.post('/addItem', function (req, res, next) {
    Cart.findById({ _id: req.body.cart }, (err, result) => {
        if (err) throw err;
    }).then((result) => {
        var total = req.body.item.quantity * req.body.item.productPrice;
        var item = new CartItem({
            _id: new mongoose.Types.ObjectId(), product: req.body.item._id,
            quantity: req.body.item.quantity, totalPrice: total, cart: result.id
        });
        CartItem.collection.insert(item, (err) => {
            if (err) throw err;
            CartItem.findOne({ _id: item._id }).populate('product', 'productName productImage')
                .exec((err, result) => {
                    if (err) throw err;
                    res.json(result);
                });
        });
    });
});

router.delete('/deleteCartItem/:_id', function (req, res, next) {
    var cartItemID = req.params._id;
    CartItem.findByIdAndRemove({ _id: cartItemID }, (err, result) => {
        if (err) throw err;
        res.json({ message: "item deleted" });
    });
});

router.delete('/deleteAllItems/:_id', function (req, res, next) {
    var cartID = req.params._id;
    CartItem.deleteMany({ cart: cartID }, (err) => {
        if (err) throw err;
        res.json({ message: "deleted all" });
    });
});

module.exports = router;
