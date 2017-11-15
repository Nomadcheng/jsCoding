var child1 = require('child_process').fork('./child2.js');
var child2 = require('child_process').fork('./child2.js');
// Open up the server object and send the handle
var server = require('net').createServer();

// server.on('connection', function (socket) {
//   socket.end('handled by parent\n');
// });

server.listen(1337, function () {
  child1.send('server', server);
  child2.send('server', server);
  // shut down
  server.close();
});
