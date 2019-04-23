var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tagRouter = require('./routes/tag');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// lanjie
app.use(function (req, res, next) {
  if(req.cookies.username) {
    next();
  }else {
    if( req.originalUrl == '/users/login'|| 
        req.originalUrl == '/users/addUser'||
        req.originalUrl == '/tag/getPicByTag'||
        req.originalUrl == '/tag/getTagName'||
        req.originalUrl == '/tag/getRecpic'||
        req.originalUrl == '/users/getPic'
        ){
      next();
    }else {
      res.json({
        status:'10001',
        msg:'当前未登陆',
        result:''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tag', tagRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
