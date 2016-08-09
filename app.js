var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');
var sesiones = require('./routes/sesiones');
var usuario = require('./routes/usuario');
var busqueda = require('./routes/busqueda');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '9582a15ab51eec66ec5c5ed55cdaafb1c28c7375',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', routes);
//app.use('/users', users);
app.use('/usuario', usuario);
app.use('/busqueda', busqueda);
app.use('/sesiones', sesiones);

// Si no ha iniciado sesión, se va directo a login.
app.get(/.*/, function(req, res, next) {
    if (!req.session.usuario) {
        res.redirect('/');
    } else {
        next();
    }
});
app.post(/.*/, function(req, res, next) {
    if (!req.session.usuario) {
        res.redirect('/');
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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
  if (err.status === 403) {
    err.message = "No tienes permiso para hacer esta acción. " + err.message;
  }
    res.status(err.status || 500);
    res.render('error', {
        usuario: req.session.usuario,
        message: err.message,
        error: {}
    });
});

module.exports = app;
