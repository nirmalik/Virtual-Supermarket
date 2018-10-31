// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var Customer = require('./models/Customer');
// var passport = require('passport');
// var mongoose = require('mongoose');
// var LocalStrategy = require('passport-local').Strategy;
// mongoose.connect('mongodb://localhost:27017/mystore');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var productsRouter = require('./routes/products');
// var ordersRouter = require('./routes/orders');
// var cartsRouter = require('./routes/carts');


// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');




// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(express.static(path.join(__dirname, 'public')));

// // app.use(session({
// //   secret: '123qwe',
// //   resave: true,
// //   saveUninitialized: true
// // }));
// // app.use(passport.initialize());
// // app.use(passport.session());
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

// passport.use(new LocalStrategy(Customer.authenticate()));
// passport.serializeUser(Customer.serializeUser());
// passport.deserializeUser(Customer.deserializeUser());


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', productsRouter);
// app.use('/orders', ordersRouter);
// app.use('/carts', cartsRouter);



// // passport.use(new LocalStrategy(Customer.authenticate()));
// // passport.serializeUser(Customer.serializeUser());
// // passport.deserializeUser(Customer.deserializeUser());



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;





var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var cartsRouter = require('./routes/carts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
// passport config
var Customer = require('./models/Customer');
passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost:27017/mystore');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;

