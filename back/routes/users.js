var express = require('express');
var router = express.Router();
var passport = require('passport');
var Customer = require('../models/Customer');
var Cart = require('../models/Cart');
var Order = require('../models/Order');
var mongoose = require('mongoose');

// router.post('/addCustomer', function (req, res, next) {
//   Customer.find({ customerid: req.body.firstObj.customerid }, (err, customers) => {
//     if (err) throw err;
//     if (customers.length > 0) {
//       res.json({ message: "id already exists" });
//     } else {
//       Customer.register(new Customer({
//         _id: new mongoose.Types.ObjectId(), username: req.body.firstObj.username, name: req.body.secondObj.name,
//         familyName: req.body.secondObj.familyName, customerid: req.body.firstObj.customerid,
//         city: req.body.secondObj.city, street: req.body.secondObj.street
//       }), req.body.firstObj.password, (err, customer) => {
//         if (err) {
//           return res.json(err);
//         }
//         passport.authenticate('local')(req, res, () => {
//           res.send("signed up");
//           // req.session.save((err) => {
//           //   if (err) {
//           //     return next(err);
//           //   }
//           //   res.send("signed up");
//           // });
//         });
//       });
//     }
//   });
// });

router.post('/checkID', function (req, res, next) {
  let id = req.body.id;
  Customer.find({ customerid: id }, (err, customer) => {
    if (err) throw err;
    if (customer.length > 0) {
      res.json({ message: "id already exists" });
    } else {
      res.json({ message: "id is free" });
    }
  });
});

router.post('/checkEmail', function (req, res, next) {
  let email = req.body.email;
  Customer.find({ username: email }, (err, customer) => {
    if (err) throw err;
    if (customer.length > 0) {
      res.json({ message: "email already exists" });
    } else {
      res.json({ message: "email is free" });
    }
  });
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   Customer.find({ username: req.body.username }, (err, result) => {
//     if (err) throw err;
//     var customer = result;
//     Cart.find({ customer: customer[0].id }, (err, data) => {
//       if (err) throw err;
//       if (data.length > 0) {
//         let obj = { customer: customer[0], cart: data[0] };
//         res.json(obj);
//       } else {
//         Order.findOne({ customer: customer[0].id }).sort({ dateOrdered: -1 }).exec((err, order) => {
//           if (err) throw (err);
//           if (order == null) {
//             let obj = { customer: customer[0], cart: { dateCreated: "welcome to your first purchase" } };
//             res.json(obj);
//           } else {
//             let obj = { customer: customer[0], order: { dateOrdered: order.dateOrdered.toString() } };
//             res.json(obj);
//           }
//         });
//       }
//     });
//   });
// });

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({ message: "no user found" }) }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      var customer = user;
      Cart.find({ customer: customer.id }, (err, data) => {
        if (err) throw err;
        if (data.length > 0) {
          let obj = { customer: customer, cart: data };
          res.json(obj);
        } else {
          Order.findOne({ customer: customer.id }).sort({ dateOrdered: -1 }).exec((err, order) => {
            if (err) throw (err);
            if (order == null) {
              let obj = { customer: customer, cart: { dateCreated: "welcome to your first purchase" } };
              res.json(obj);
            } else {
              let obj = { customer: customer, order: { dateOrdered: order.dateOrdered.toString() } };
              res.json(obj);
            }
          });
        }
      });
    });
  })(req, res, next);
});

router.post('/getUserDetails', function (req, res, next) {
  Customer.findOne({ username: req.body.data }, (err, result) => {
    if (err) throw err;
    var customer = result;
    Cart.find({ customer: customer.id }, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        let obj = { customer: customer, cart: data };
        res.json(obj);
      } else {
        Order.findOne({ customer: customer.id }).sort({ dateOrdered: -1 }).exec((err, order) => {
          if (err) throw (err);
          if (order == null) {
            let obj = { customer: customer, cart: { dateCreated: "welcome to your first purchase" } };
            res.json(obj);
          } else {
            let obj = { customer: customer, order: { dateOrdered: order.dateOrdered.toString() } };
            res.json(obj);
          }
        });
      }
    });
  });
});


router.get('/session', function (req, res) {
  if (req.session.passport) {
    res.json(req.session.passport.user);
  } else {
    res.json({ error: "no session" });
  }
});


router.post('/register', (req, res, next) => {
  Customer.register(new Customer({
    _id: new mongoose.Types.ObjectId(), username: req.body.username, name: req.body.name,
    familyName: req.body.familyName, customerid: req.body.customerid,
    city: req.body.city, street: req.body.street
  }), req.body.password, (err, account) => {
    if (err) {
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.json({ message: "registered" });
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.passport = undefined;
  res.json({ message: "logged out" });
});


module.exports = router;
