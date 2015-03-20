var koa = require("koa");
var fs = require('fs');

var ip = process.env.OPENSHIFT_IOJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_IOJS_PORT || 8000;

var app = koa();

app.use(function* () {
  var file = fs.readFileSync(__dirname + '/index.html');
  this.set("content-type", "text/html");
  this.body = file;
});

var server = app.listen(port, ip);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  var interval = setInterval(function () {
    socket.emit('news', {hello: 'world', at: new Date()});
  }, 100);

  socket.on("disconnect", function () {
    clearInterval(interval);
  })

});