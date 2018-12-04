module.exports = {
  init: function () {
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();

    app.use(express.static('html/public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    return app;
  },

  listen: function(app) {
    return app.listen(8081, function() {
      console.log("Webserver Started");
    });
  },

  listens: function(app) {
    var fs = require('fs');
    var https = require('https');
    certoptions = {
       key  : fs.readFileSync("../gate_ssl/web/key.pem"),
       cert : fs.readFileSync("../gate_ssl/web/signedkey.cer")
    };
    return https.createServer(certoptions, app).listen(3000, function () {
       console.log('Started https on 3000!');
    });
  }
}
