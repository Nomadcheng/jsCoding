
// var options = {
//   host: 'www.google.com',
//   port: 80,
//   path: './upload',
//   method: 'post'
// };

// var req = http.request(options, function (res) {
//   console.log(res.statusCode);
//   console.log(JSON.stringify(rs.headers));
//   res.setEncoding('utf-8');
//   res.on('data', (chunk) => {
//     console.log('BODY:' + chunk);
//   });
//   res.on('end', () => {
//     console.log('end');
//   });
// });
// req.on('error', (e) => {
//   console.log(e.message);
// });
//
// // write data to request BODY
// req.write('data\n');
// req.write('data\n');
// req.end();

// var helloworld = "";
//
// for (var i = 0; i < 1024 * 10; i++) {
//   helloworld += 'a';
// };
//
// helloworld = new Buffer(helloworld);
//
// http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end(helloworld);
// }).listen(8001);

var net = require('net');

var server = net.createServer(function (socket){
  socket.on('data', function (data) {
    socket.write("你好");
  });
  socket.on('end', function () {
    console.log("连接断开");
  });
  socket.write("welcome");
});

server.listen(8124, function() {
  console.log("server bound");
});
