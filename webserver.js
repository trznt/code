function logger(req) {
  var d = new Date();
  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress
  console.log("[" + d.toISOString() + "] - [" + ip + "] : " + req.route.path);
}
function search_trim(val) {
  var words_to_strip = ['what','the','how','is','are','which','why','of','to','my'];
  val = val.toLowerCase();
  val = val.replace(/[&\/\\#,+()$~^%.'":*?<>{}]/g, '');
  for (var i = 0; i < words_to_strip.length;i++) {
    val = val.replace(words_to_strip[i],'');
    console.log("loop")
  }
  val = val.replace(/\s\s+/g, ' ');
  val = val.trim();
  return val;
}

function getFormattedDate(date) {
  var fdate = new Date(date);
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var year = fdate.getFullYear();
  var month = fdate.getMonth();
  var dt = fdate.getDate();

  if (dt < 10)
    dt = "0" + dt;
    console.log(dt + "-" + monthNames[month] + "-" + year);
  return (dt + "-" + monthNames[month] + "-" + year);
}

function sortJSON(array) {
  array.sort(function(a,b){
    if (a.page < b.page) {return -1;}
    if (a.page > b.page) {return 1;}
    return 0;
  });
  return array;
}

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

      app.get('/googlee0ab6be40d7ad1a3.html',function(req,res){
        res.sendFile('/home/node/googlee0ab6be40d7ad1a3.html')
        console.log('rendering Google Verify');
      });

      app.get('/',function(req,res){
        db.collection("index").find().sort({created: 1}).toArray(function(err,results){
          if (err) throw err;
          if (results.length == 0)
            res.render(__dirname + '/html/content/main/enu/search_0.ejs')
          else {
            var resultObj = [];
            var i = 0;
            for (i = 0; i < results.length && i < 10;i++) {
              results[i].created = getFormattedDate(results[i].created);
              results[i].last_upd = getFormattedDate(results[i].last_upd);
              resultObj.push(results[i]);
            }
            var count = results.length;
            //console.log(results);
            res.render(__dirname + '/html/content/main/enu/index.ejs',{count : i, resultObj : resultObj});
            logger(req);
          }
        });
      });

      app.get('/embolden',function(req,res){
        res.render(__dirname + '/html/content/main/enu/embolden.ejs')
        logger(req);
      });

      app.get('/privacy',function(req,res){
        res.render(__dirname + '/html/content/main/enu/privacy.ejs')
        logger(req);
      });

      app.get('/terms',function(req,res){
        res.render(__dirname + '/html/content/main/enu/terms.ejs')
        logger(req);
      });

      app.get('/about',function(req,res){
        res.render(__dirname + '/html/content/main/enu/about.ejs')
        logger(req);
      });

      app.get('/contact',function(req,res){
        res.render(__dirname + '/html/content/main/enu/contact.ejs')
        logger(req);
      });

      app.get('/algo',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/index.ejs')
        logger(req);
      });

      app.get('/code',function(req,res){
        res.render(__dirname + '/html/content/code/enu/index.ejs')
        logger(req);
      });

      app.get('/infra',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/index.ejs')
        logger(req);
      });

      app.get('/infra/set_up_aws',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/set_up_aws.ejs')
        logger(req);
      });

      app.get('/infra/set_up_aws_win',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/set_up_aws.ejs')
        logger(req);
      });

      app.get('/infra/virtualization',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/virtualization.ejs')
        logger(req);
      });

      app.get('/infra/containerization',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/containerization.ejs')
        logger(req);
      });

      app.get('/infra/containerization/docker_install',function(req,res){
        res.render(__dirname + '/html/content/infra/enu/docker_install.ejs')
        logger(req);
      });

      app.get('/db',function(req,res){
        res.render(__dirname + '/html/content/db/enu/index.ejs')
        logger(req);
      });

      app.get('/db/mysql',function(req,res){
        res.render(__dirname + '/html/content/db/enu/mysql.ejs')
        logger(req);
      });

      app.get('/code/c',function(req,res){
        res.render(__dirname + '/html/content/code/enu/c_setup.ejs')
        logger(req);
      });

      app.get('/code/c/hello_world',function(req,res){
        res.render(__dirname + '/html/content/code/enu/c_hello_world.ejs')
        logger(req);
      });

      app.get('/code/c/computation',function(req,res){
        res.render(__dirname + '/html/content/code/enu/c_addition.ejs')
        logger(req);
      });

      app.get('/algo/sorting',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/sorting.ejs')
        logger(req);
      });

      app.get('/algo/bubblesort',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/bubblesort.ejs')
        logger(req);
      });

      app.get('/algo/insertionsort',function(req,res){
        res.render(__dirname + '/html/content/algo/enu/insertionsort.ejs')
        logger(req);
      });

      app.get('/g8w31',function(req,res){
        res.render(__dirname + '/html/content/admin/enu/login.ejs')
        logger(req);
      });

      app.get('/createuser',function(req,res){
        res.sendFile('/home/kumarsp2/trznt/gate0000/createuser.html')
        logger(req);
      });

      app.get('/home',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/home.ejs')
        }
        else
          res.redirect("/");
        logger(req);
      });

      app.get('/add_page',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/add_page.ejs')
        }
        else
          res.redirect("/");
        logger(req);
      });

      app.get('/edit_page',function(req,res){
        if (req.session_state.email !== undefined) {
          console.log("Session is " + req.session_state.email);
          res.render(__dirname + '/html/content/admin/enu/edit_page.ejs')
        }
        else
          res.redirect("/");
        logger(req);
      });

      app.post('/getSalt',urlencodedParser, function(req,res){
        console.log(rand(160,36));
        res.end(rand(160,36));
        console.log('getsalt');
        logger(req);
      });

      app.post('/search',urlencodedParser, function(req,res){
        console.log("searching for " + req.body.search);
        console.log("searching for only: " + search_trim(req.body.search));
        var keywords = search_trim(req.body.search.toLowerCase()).split(' ');
        db.collection("index").find({tags: { $in : keywords}}).toArray(function(err,results){
          if (err) throw err;
          if (results.length == 0) {
            res.render(__dirname + '/html/content/main/enu/search_0.ejs');
            logger(req);
          }
          else {
            var count = results.length;
            console.log(results);
            res.render(__dirname + '/html/content/main/enu/search.ejs',{count : count, results : results});
            logger(req);
          }
        });

      });

      app.get('/sitemap', function(req,res){
        var categories = ['algo','infra','db','code'];
        db.collection("index").find({category: { $in : categories}}).sort({"category":1}).toArray(function(err,results){
          if (err) throw err;
          console.log('Result count ' + results.length);
          var resultSet = {};
          resultSet.algo =[];
          resultSet.db =[];
          resultSet.infra =[];
          resultSet.code =[];
          var i = 0;
          while (i < results.length) {
            if (results[i].category == "algo") {
                resultSet.algo.push(results[i]);
            }
            else if (results[i].category == "code") {
                resultSet.code.push(results[i]);
            }
            else if (results[i].category == "db") {
                resultSet.db.push(results[i]);
            }
            else if (results[i].category == "infra") {
                resultSet.infra.push(results[i]);
            }
            i++;
          }
          resultSet.algo = sortJSON(resultSet.algo);
          resultSet.code = sortJSON(resultSet.code);
          resultSet.db = sortJSON(resultSet.db);
          resultSet.infra = sortJSON(resultSet.infra);
          console.log(results);
          res.render(__dirname + '/html/content/main/enu/sitemap.ejs',{resultSet : resultSet});
          logger(req);
        });
      });

      app.get('/api/edit_index_detail', function(req,res){
        if (req.session_state.email !== undefined){
            console.log(req.query.route);
            db.collection("index").find({route: req.query.route}).toArray(function(err,result){
              if (err) throw err;
                res.render(__dirname + '/html/content/admin/enu/edit_index_detail.ejs',result[0]);
            });
        }
        else
          res.redirect("/");
        logger(req);
      });

      app.get('/api/getIndex', function (req,res){
        if (req.session_state.email !== undefined){
            db.collection("index").find({}).toArray(function(err,result){
              if (err) throw err;
                res.send(result);
            });
        }
        else
          res.redirect("/");
        logger(req);
      });

      app.post('/getSaltForLogin',urlencodedParser, function(req,res){
        var salt = rand(160,36);
        req.session_state.loginsalt = salt;
        console.log('salt for loing is ' + req.session_state.loginsalt);
        res.end(salt);
        console.log('getSaltForLogin');
        logger(req);
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
        logger(req);
      });

      app.post('/add_page_into_db',urlencodedParser, function(req,res){
        console.log(req.body.data);
        var inputDate = new Date();
        req.body.data.last_upd = inputDate.toISOString();

        var index = db.collection('index');
        try {
          index.find({"route" : req.body.data.route},{_id:1}).toArray(function(err,docs) {
            if (!err){
              if (docs.length == 0) {
                req.body.data.created = req.body.data.last_upd;
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
                index.updateOne({"route" : req.body.data.route},{$set:{"tags":req.body.data.tags,"page":req.body.data.page,"desc":req.body.data.desc,"last_upd":req.body.data.last_upd,"category":req.body.data.category}}, function(err) {
                  if (!err) {res.send('updated');}
                  else {res.send("Error in updating page")}
                })
              }
            }
            else {res.end("Error in performing transaction")}
          });
        }
        catch (e) {res.end(e)};
        logger(req);
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
        logger(req);
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
