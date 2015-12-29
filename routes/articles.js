var express = require('express');
var router = express.Router();
var couch = require('../utils/db').db();
var db = couch.use('my_site');

/* GET article*/
router.get('/content',function(req,res,next){
  db.get(req.query.name).pipe(res);
});

/* GET articles */
router.get('/', function(req, res, next) {
  var params = {};
  var viewName = "list";
  params.limit = req.query.num;
  params.descending = true;
  if(req.query.startkey){
      params.startkeyDocid = req.query.startkey_docid;
      params.startkey = req.query.startkey;
      params.skip = 1;
  }
  if(req.query.type){
    viewName = req.query.type + "_" + viewName;
  }

  db.view('article',viewName,params).pipe(res);
});

module.exports = router;
