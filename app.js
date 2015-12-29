var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var articles = require('./routes/articles');
var blogs = require('./routes/blogs');
var about = require('./routes/about');
var app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/api/article', articles);
app.use('/api/blog', blogs);
app.use('/api/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
