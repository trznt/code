var ws = require('./lib/webserver.js');
var app = ws.init();
var server;

var dbconn = require('./lib/dbconn.js');
var dbhandle;
var db;

dbconn.openDB(0,function (error, res) {
  if (error)
    console.log("Unable to connect to the Database " + error.message);
  else {
    console.log("DBCONN is now set");
    dbhandle = res; // Setting DB Handle.
    db = dbhandle.db("optin"); //Setting db to point to the instance we are looking to write into.
    server = ws.listen(app);
    console.log("Server is listening at http://%s:%s", server.address().address, server.address().port);
  }
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/html/index.html')
  console.log('accessed Index');
});
