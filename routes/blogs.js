var express = require('express');
var router = express.Router();
var base64 = require('../utils/base64');
var couch = require('../utils/db').db();
var db = couch.use('my_site');
var moment = require('moment');
/* GET blog*/
router.get('/content',function(req,res,next){
  db.get(req.query.name).pipe(res);
});

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

router.post('/',function(req,res,next){

  req.body.contents.forEach(function(el,i){
    if(el[0]==='img'){
      var data = {};
      var name = '';
      console.log('type:' + req.body.type + ' category:' + req.body.category);
      if(req.body.type === 'article' ||
         (req.body.type === 'blog' && req.body.category === 'work')){
        name = req.body._id + i.toString();
      }else{
        name = moment(req.body._id).format('YYYYMMDD');
      }
      var c = req.body.category?req.body.category:'';
      name = req.body.type + c + name + '.png';
      data.name = name;
      data.image = el[1];
      base64.upload(data);
      el[1] = '/images/attach/'+data.name;
    }
  });

  db.insert(req.body,function(err,body){
    if(!err){
      res.json(body);
    }else{
      throw err;
    }
  });
});

module.exports = router;
