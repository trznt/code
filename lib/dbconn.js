const DB_MAX_TRIES = 5;

var fs = require('fs');
var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');


  // Read the cert and key
var ca = fs.readFileSync("../gate_ssl/CA/caroot.cer");
var cert = fs.readFileSync("../gate_ssl/client/node01.pem");
var key = fs.readFileSync("../gate_ssl/client/node01.pem");

//var userName = encodeURIComponent("emailAddress=sanjeev@trznt.com,CN=node01.trznt.com,OU=IT,O=trznt,L=Bangalore,ST=Karnataka,C=IN");
var userName = "emailAddress=trznt0@gmail.com,ST=Karnataka,OU=FRONTEND,L=Bangalore,O=TRZNT,C=IN,CN=node01";


function _openDB(tries,callback) {
    MongoClient.connect(f('mongodb://%s@%s:27017/' + process.env.DBNAME + '?authMechanism=%s&ssl=true', encodeURIComponent(userName),'MONGO01','MONGODB-X509'), {
        useNewUrlParser: true
      , sslCA:ca
      , sslKey:key
      , sslCert:cert
      , sslValidate:true
  }, function(err, db) {
    if (err) {
      if (tries >= DB_MAX_TRIES) {
        return callback && callback(err,null);
      }
      console.log("DB: " + process.env.DBSERVER + " not open.. retrying");
      return setTimeout(_openDB,10000,tries + 1, callback);
    }
    callback(null,db);
  })
}

module.exports = {
  openDB: function (tries,callback) {
    _openDB(0,callback);
  }
}
