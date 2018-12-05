var ws = require('./lib/webserver.js');
var app2 = ws.init();
var server;
var secure_server;

var dbconn = require('./lib/dbconn.js');
var dbhandle;
var db;

var https = require('https');
var app = ws.init();
var certoptions;

dbconn.openDB(0,function (error, res) {
  if (error)
    console.log("Unable to connect to the Database " + error.message);
  else {
    console.log("DBCONN is now set");
    dbhandle = res; // Setting DB Handle.
    db = dbhandle.db("optin"); //Setting db to point to the instance we are looking to write into.
    server = ws.listen(app2);
    console.log("Server is listening at http://%s:%s", server.address().address, server.address().port);
    secure_server = ws.listens(app);
  }
});

app2.get('/',function(req,res){
  res.sendFile(__dirname + '/html/enu/index.html')
  console.log('accessed Index');
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/html/enu/index.html')
  console.log('accessed Index');
});

app.get('/embolden',function(req,res){
  res.sendFile(__dirname + '/html/enu/embolden.html')
  console.log('accessed Index');
});
