var express = require('express');
var router = express.Router();
var couch = require('../utils/db').db();
var db = couch.use('business');

/* GET about*/
router.get('/',function(req,res,next){
  db.get('intro').pipe(res);
});

router.post('/',function(req,res,next){
  db.insert(req.body,function(err,body){
    if(!err){
      res.json(body);
    }else{
      throw err;
    }
  });
});

module.exports = router;
