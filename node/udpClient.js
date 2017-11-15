var dgram = require('dgram');

var message = new Buffer('what\'s matter');

var client = dgram.createSocket("udp4");

client.send(message, 0, message.length, 8081, "localhost", function(err, bytes) {
  client.close();
});
