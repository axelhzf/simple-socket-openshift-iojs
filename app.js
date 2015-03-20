var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');


var ipaddress = process.env.OPENSHIFT_IOJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_IOJS_PORT || 8080;

app.listen(port, ipaddress);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.setHeader("content-type", "text/html");
      res.writeHead(200);
      res.end(data);
    });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});