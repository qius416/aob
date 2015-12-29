var fs = require("fs");

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
  var path = process.env.upload_path;
  //if(!path){
  //  path = 'C:\\Users\\kouky_000\\dev\\upload\\';
  //}
  //fs.writeFile(data.name + "." + buf.type, buf.data, function(err) {
  fs.writeFile(path + data.name + '.png', buf.data, function(err) {
    if(err) throw err;
  });
};
