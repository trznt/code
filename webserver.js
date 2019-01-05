module.exports = {
  setRoutes: function(app,db) {
    var rand = require('csprng');
    var bodyParser = require('body-parser');
    var sha512 = require('js-sha512');
    var urlencodedParser = bodyParser.urlencoded({extended:true});
    var jsonParser = bodyParser.json();

      app.use(jsonParser);
      app.use(urlencodedParser);
      app.set('view engine','ejs');

      app.get('/',function(req,res){
        res.render(__dirname + '/html/content/main/enu/index.ejs')
        console.log('rendering Index');
      });

      app.get('/embolden',function(req,res){
        res.render(__dirname + '/html/content/main/enu/embolden.ejs')
        console.log('rendering embolden');
      });

      app.get('/algo',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/index.ejs')
        console.log('rendering Algo-Index');
      });

      app.get('/code',function(req,res){
        res.render(__dirname + '/html/content/code/enu/index.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/index.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra/set_up_aws',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/set_up_aws.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra/set_up_aws_win',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/set_up_aws.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra/virtualization',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/virtualization.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra/containerization',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/containerization.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/infra/containerization/docker_install',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/docker_install.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/db',function(req,res){
        res.render(__dirname + '/html/content/db/enu/index.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/db/mysql',function(req,res){
        res.render(__dirname + '/html/content/db/enu/mysql.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/code/c',function(req,res){
        res.render(__dirname + '/html/content/code/enu/c_setup.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/code/c/hello_world',function(req,res){
        res.render(__dirname + '/html/content/code/enu/c_hello_world.ejs')
        console.log('rendering Code-Index');
      });

      app.get('/algo/sorting',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/sorting.ejs')
        console.log('rendering Algo-Index');
      });

      app.get('/algo/bubblesorting',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/bubblesorting.ejs')
        console.log('rendering Algo-Index');
      });

      app.get('/g8w31',function(req,res){
        res.render(__dirname + '/html/content/admin/enu/login.ejs')
        console.log('rendering Login');
      });

      app.get('/createuser',function(req,res){
        res.sendFile('/home/kumarsp2/trznt/gate0000/createuser.html')
        console.log('rendering CreateUser');
      });

      app.get('/home',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/home.ejs')
        }
        else
          res.redirect("/");
      });

      app.get('/add_page',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/add_page.ejs')
        }
        else
          res.redirect("/");
      });

      app.get('/edit_page',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/edit_page.ejs')
        }
        else
          res.redirect("/");
      });

      app.post('/getSalt',urlencodedParser, function(req,res){
        console.log(rand(160,36));
        res.end(rand(160,36));
        console.log('getsalt');
      });

      app.get('/api/edit_index_detail', function(req,res){
        if (req.session_state.email !== undefined){
            console.log(req.query.route);
            db.collection("index").find({route: req.query.route}).toArray(function(err,result){
              if (err) throw err;
                res.render(__dirname + '/html/content/admin/enu/edit_index_detail.ejs',result[0]);
            });
            console.log("Accessed getIndex");
        }
        else
          res.redirect("/");
      });

      app.get('/api/getIndex', function (req,res){
        if (req.session_state.email !== undefined){
            db.collection("index").find({}).toArray(function(err,result){
              if (err) throw err;
                res.send(result);
            });
            console.log("Accessed getIndex");
        }
        else
          res.redirect("/");
      });

      app.post('/getSaltForLogin',urlencodedParser, function(req,res){
        var salt = rand(160,36);
        req.session_state.loginsalt = salt;
        console.log('salt for loing is ' + req.session_state.loginsalt);
        res.end(salt);
        console.log('getSaltForLogin');
      });

      app.post('/getSaltForUser',urlencodedParser, function(req,res){
        console.log(req.body.email);
        var users = db.collection('users');
        var qryStr = req.body.email;
        try {
          users.find({"user" : qryStr},{_id:0,user:1,salt:1}).toArray(function(err,docs) {
            if (!err){
            if (docs.length == 0) {res.end("")}
            else {res.send(docs[0].salt)}
            }
            else {res.end("Error in fetching documents")}
          });
        }
        catch (e) {res.end(e)};
        console.log('getsalt');
      });

      app.post('/add_page_into_db',urlencodedParser, function(req,res){
        console.log(req.body.data);
        var index = db.collection('index');
        try {
          index.find({"route" : req.body.data.route},{_id:1}).toArray(function(err,docs) {
            if (!err){
              if (docs.length == 0) {
                index.insertOne(req.body.data, function(err2,insertObj){
                  if (!err2) {
                    res.end('inserted');
                  }
                  else {
                    res.end('fail');
                  }
                })
              }
              else {
                index.updateOne({"route" : req.body.data.route},{$set:{"tags":req.body.data.tags,"page":req.body.data.page}}, function(err) {
                  if (!err) {res.send('updated');}
                  else {res.send("Error in updating page")}
                })
              }
            }
            else {res.end("Error in performing transaction")}
          });
        }
        catch (e) {res.end(e)};
      });

      app.post('/checkUserHash',urlencodedParser, function(req,res){
        console.log(req.body.email);
        var users = db.collection('users');
        var user = req.body.email;
        var clienthash = req.body.clienthash;
        console.log(clienthash + user);
        try {
          users.find({"user" : user},{_id:0,user:1,hash:1}).toArray(function(err,docs) {
              if (!err){
              if (docs.length == 0) {res.end("")}
              else {
                if (sha512(req.session_state.loginsalt + docs[0].hash) ==  clienthash) {
                  req.session_state.email = user;
                  res.send("valid");
                }
                else
                  res.send("Invalid")
              }
            }
            else {res.end("Error in fetching documents")}
          });
        }
        catch (e) {res.end(e)};
        console.log('checkUserHash');
      });
  },

  setRoutesHTTP: function(app) {

    var bodyParser = require('body-parser');
    var sha512 = require('js-sha512');
    var urlencodedParser = bodyParser.urlencoded({extended:true});
    var jsonParser = bodyParser.json();

    app.use(jsonParser);
    app.use(urlencodedParser);
    app.set('view engine','ejs');

    app.get('*',function(req,res){
      if (process.env.ENVMODE == "PROD") {
        res.redirect('https://www.trznt.com' + req.url);
      }
      else if (process.env.ENVMODE == "DEV") {
        res.redirect('https://dev.trznt.com:3000' + req.url);
      }
    })
  },

  listen: function(app) {
    return app.listen(8081, function() {
      console.log("Webserver Started");
    });
  },

  listens: function(app) {
    var fs = require('fs');
    var https = require('https');
    var key = process.env.HTTP_SSL_KEY;
    var cert = process.env.HTTP_SSL_CERT;
    certoptions = {
       key  : fs.readFileSync(key),
       cert : fs.readFileSync(cert)
    };
    return https.createServer(certoptions, app).listen(3000, function () {
       console.log('Started https on 3000!');
    });
  }
}
