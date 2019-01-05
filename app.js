var ws = require('./webserver.js');
var server;
var secure_server;
var express = require('express');
var app = express();
var app2 = express();
var usersession = require('client-sessions');


var dbconn = require('./lib/dbconn.js');
var dbhandle;
var db;


var https = require('https');


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});
var jsonParser = bodyParser.json();



var certoptions;

dbconn.openDB(0,function (error, res) {
  if (error)
    console.log("Unable to connect to the Database " + error.message);
  else {
    console.log("DBCONN is now set");
    dbhandle = res; // Setting DB Handle.
    db = dbhandle.db(process.env.DBNAME); //Setting db to point to the instance we are looking to write into.
    var cookie_key = db.collection('cookie_key');
    try {
      cookie_key.find({},{_id:0,key:1}).toArray(function(err,docs) {
        if (!err){
        if (docs.length == 0) {res.end("")}
        else {
            console.log('setting cookie')
            app.use(usersession({
              cookieName: 'session_state',
              secret: docs[0].key,
              duration: 30 * 60 * 1000,
              activeDuration: 5 * 60 * 1000,
            }));
            ws.setRoutes(app,db);
            secure_server = ws.listens(app);
            app.use(express.static('html/public'));
            ws.setRoutesHTTP(app2,db);
            server = ws.listen(app2);
            app2.use(express.static('html/public'));
            console.log("Server is listening at http://%s:%s", server.address().address, server.address().port);

          }
        }
        else {console.log("Error in fetching documents")}
      });
    }
    catch (e) {console.log(e)};
  }
});
