var agentkeepalive = require('agentkeepalive');

var myagent,db;

exports.db = function() {
  if (db === undefined) {
    myagent = new agentkeepalive({
      maxSockets: 10,
      maxFreeSockets: 5,
      keepAliveTimeout: 30000,
      timeout: 60000
    });
    db = require('nano')({
      "url": "http://localhost:5984",
      "requestDefaults": {
        "agent": myagent
      }//,"log": function (id, args) {console.log(id, args);}
    });
  }
  return db;
};
