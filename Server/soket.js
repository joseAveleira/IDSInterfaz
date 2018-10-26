var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('chatmessage', function (msg) {
    io.emit('chatmessage', msg)
  })
});
server.listen(3000);
