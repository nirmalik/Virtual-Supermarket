var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var mongoose = require('mongoose');
var Product = require('../models/Product');
const download = require('image-downloader')



router.post('/addCategory', function (req, res, next) {
    let category = new Category({ _id: new mongoose.Types.ObjectId(), categoryName: req.body.categoryName });
    Category.collection.insert(category, function (err) {
        if (err) throw err;
        res.json(category);
    });
});

router.post('/addProduct', function (req, res, next) {
    Category.findOne({ categoryName: req.body.category }, (err, result) => {
        if (err) throw err;
    }).then((result) => {
        let product = new Product({
            _id: new mongoose.Types.ObjectId(), productName: req.body.productName
            , productPrice: req.body.productPrice, productImage: req.body.productImage,
            category: result.id
        });
        Product.collection.insert(product, function (err) {
            if (err) throw err;
            var path = "C:/Users/Igal/Desktop/store-back/public/images";
            const options = {
                url: req.body.productImage,
                dest: path
            }
            download.image(options)
                .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                })
                .catch((err) => {
                    console.log(err)
                });
            res.json(product);
        });
    })
});

router.get('/getAllProducts', function (req, res, next) {
    Product.find({}).populate('category', 'categoryName').exec((err, products) => {
        if (err) throw err;
        res.json(products);
    });
});

router.get('/getRequestedProducts/:term', function (req, res, next) {
    var term = req.params.term;
    Product.find({ productName: new RegExp(term, 'i') }).populate('category', 'categoryName')
        .exec((err, products) => {
            if (err) throw err;
            res.json(products);
        });
});

router.put('/updateProduct', function (req, res, next) {
    Category.findOne({ categoryName: req.body.category }).then((result) => {
        Product.findByIdAndUpdate(req.body._id, {
            productName: req.body.productName, productPrice: req.body.productPrice
            , productImage: req.body.productImage, category: result.id
        }, { new: true }).then((data) => {
            var path = "C:/Users/Igal/Desktop/store-back/public/images";
            const options = {
                url: req.body.productImage,
                dest: path
            }
            download.image(options)
                .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                })
                .catch((err) => {
                    console.log(err)
                });
            res.json(data);
        });
    })
});

router.get('/getOneProduct/:_id', function (req, res, next) {
    var productID = req.params._id
    Product.findOne({ _id: productID }, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});



module.exports = router;