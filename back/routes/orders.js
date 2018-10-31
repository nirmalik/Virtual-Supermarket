var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cart = require('../models/Cart');
var CartItem = require('../models/CartItem');
var Order = require('../models/Order');

router.post('/createOrder', function (req, res, next) {
    var newOrder = new Order(req.body);
    Order.collection.insert(newOrder, (err) => {
        if (err) throw err;
        Cart.deleteOne({ _id: req.body.cart }, (err, result) => {
            CartItem.deleteMany({ cart: req.body.cart }, (err, result) => {
                if (err) throw err;
                res.json({ message: "order is successful" });
            });
        });
    });
});

router.post('/getOrder', function (req, res, next) {
    Order.findById({ _id: req.body._id }).populate("cart").exec((err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/getAllOrders', function (req, res, next) {
    Order.find({}, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});



module.exports = router;
