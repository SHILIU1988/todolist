
var user = require('./routes/users').user;
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs') ;	 
var server = express();
 
//处理页面静态链接请求

server.set('port', process.env.PORT || 8888);
server.set('views', __dirname + '/views');//指定我的views文件的位置
server.engine('html',ejs.__express) ; //注册html模板引擎
server.set('view engine', 'html');//将模板引擎换成html

 
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use(session({
  name: identity='',
  secret: 'secret',
  saveUninitialized: false, 
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 *24 * 31
  }
}))

server.get('/', function (req, res) {
    res.render('signin', {
        title: '登 录'
    });
});

server.get('/signin', function (req, res) {
    req.session.user = null;
    req.session.error = null;
    res.render('signin',{
        title: '用户登录'
    });
});


server.post('/slindex',function (req, res, next) {
    if (req.body.userid === user.userid && req.body.password === user.password) {
        req.session.user = user;
        return res.render('slindex',{
            title: 'slindex',
        });
    } else {
        return res.render('signin', {
            title: ' 登 录'
        });
    }
});	



server.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) {
    res.locals.message = '<div style="margin-bottom: 20px;color:red;z-index:9999;">' + err + '</div>';
  }
  next();
});
 
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

 
 	 
 

http.createServer(server).listen(server.get('port'), function(){
  console.log('Server listening on port ' + server.get('port'));
});
