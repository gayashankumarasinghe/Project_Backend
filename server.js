var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
const nodemailer = require('nodemailer');
// var stripe = require('stripe')('sk_test_ooaPZFrmnKS49hg1rvtU0KEv');

// var customer = await stripe.customers.create(
//   { email: 'gmadhushann@gmail.com' }
// );

require('./public/javascripts/Models/userModel');
require('./public/javascripts/Models/dataModel');
require('./public/javascripts/config/passport');
// require('./public/javascripts/config/nodemailer');
require('./public/javascripts/Controllers/authentication');
require('./public/javascripts/Controllers/profile');
require('./public/javascripts/Controllers/getData');
require('./public/javascripts/Controllers/sendEmail');
var index = require('./routes/index');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'/', './angular/dist')));

app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);


//Send all other requests to angular app
// app.get('*',function(req, res, next){
//   res.sendFile(path.join(__dirname, './angular/dist/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch unauthorised errors and forward to error handler
app.use(function (req, res, next) {
  var err= new Error('Unauthorized Error');
    err.status(401);
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
