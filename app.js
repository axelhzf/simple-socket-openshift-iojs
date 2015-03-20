//var app = require('http').createServer(handler);
var koa = require("koa");

var fs = require('fs');

var ip = process.env.OPENSHIFT_IOJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_IOJS_PORT || 3000;

var app = koa();


app.use(function* () {
  var file = fs.readFileSync(__dirname + '/index.html');
  this.set("content-type", "text/html");
  this.body =  file;
});


var server = app.listen(port, ip);

var io = require('socket.io')(server);
io.set('transports', ['websocket',
  'flashsocket',
  'htmlfile',
  'xhr-polling',
  'jsonp-polling',
  'polling']);

io.on('connection', function (socket) {
  setInterval(function () {
    socket.emit('news', {hello: 'world'});
  }, 100);

  socket.on('my other event', function (data) {
    console.log(data);
  });
});