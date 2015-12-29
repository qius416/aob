var express = require('express');
var router = express.Router();
var couch = require('../utils/db').db();
var db = couch.use('my_site');

/* GET articles with pagination */
router.get('/', function(req, res, next) {
  var params = {};
  var viewName = req.query.type;
  params.limit = req.query.num;
  params.descending = true;
  if(req.query.startkey){
      params.startkey = req.query.startkey;
      params.skip = 1;
  }
  db.view('blog',viewName,params).pipe(res);
});

module.exports = router;
