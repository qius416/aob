var fs = require("fs");
var client = require('scp2');
var Imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
client.defaults({
    port: 22,
    host: '192.168.1.3',
    username: 'qiushi',
    password: 'Edc9ce26'
});

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    throw new Error('Invalid image base64 string');
  }

  response.type = matches[1].substring(matches[1].length-3);
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

exports.upload = function(data) {
  var buf = decodeBase64Image(data.image);
  new Imagemin().src(buf.data)
                .use(rename(data.name))
                .dest('../devfront/app/images/attach/')
                .use(imageminPngquant({quality: '65-80', speed: 4}))
                .run(sendFile);
  function sendFile(err,files){
    if(err){
      console.log(err);
      throw err;
    }
    var name = '/usr/share/nginx/axiomone/images/attach/' + data.name;
    client.write({
    destination: name,
    content: files[0].contents}, delTmp);
  }
  function delTmp(err){
    if(err) {
      console.log(err);
      throw err;
    }
/*    fs.unlink(data.name,function(err){
      console.log(err);
      throw err;
    });*/
  }
};
