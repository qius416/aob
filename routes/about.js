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
/*
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport(options))
var generator = require('xoauth2').createXOAuth2Generator({
    user: 'qius416@gmail.com',
    clientId: '1003240008504-7vi30gjlia2tqkijsp7gs8cvavatmamt.apps.googleusercontent.com',
    clientSecret: 'bU0YZMBPG-HdifbIiRAz36_v',
    refreshToken: '',
    accessToken: 'nothing' // optional
});
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
            xoauth2: generator
    }
});
var mailContact = {
    from: '', // sender address
    to: 'qius416@gmail.com', // list of receivers
    subject: 'contact from axiomone', // Subject line
    text: '', // plaintext body
    html: '' // html body
};

generator.on('token', function(token){
    console.log('New token for %s: %s %s', token.user, token.accessToken, token);
});
var mailReply = {
    from: 'qiu shi ✔ <qiushi@axiomone.com>', // sender address
    to: '', // list of receivers
    subject: 'Thank you for contaction! - axiom I', // Subject line
    text: 'dear $name :\nI recieved your message, I will confirm the message and reply you as soon as possible. Thank you very much! \n\n\n\n $yourMessage', // plaintext body
    html: '<b>dear $name</b><p>I recieved your message, I will confirm the message and reply you as soon as possible. Thank you very much!</p><br><br><br><br><p>$yourMessage</p>' // html body
};

router.post('/',function(req,res,next){
  var toMe = {};
  var reply = {};
  toMe.from = req.body.name + ' - ' + req.body.email;
  toMe.to = mailContact.to;
  toMe.subject = mailContact.subject;
  toMe.text = req.body.message;
  toMe.html = '<p>' + req.body.message + '</p>';
  reply.from = mailReply.from;
  reply.to = req.body.email;
  reply.subject = mailReply.subject;
  reply.text = mailReply.text.replace('$name', req.body.name).replace('$yourMessage',req.body.message);
  reply.html = mailReply.html.replace('$name', req.body.name).replace('$yourMessage',req.body.message);
  var sendMail = function(error,info){
      var self = this;
      if(error){
          res.status(500).send(error);
      }else{
        res.json(info);
        transporter.sendMail(self.reply,function(error,info){
          if(error){
            console.log(error);
          }
        });
      }
  };
  transporter.sendMail(toMe, sendMail);
});

*/
