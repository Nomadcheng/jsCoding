var http = require('http');

http.createServer(function (req, res) {
  var postData = '';
  req.setEncoding('utf-8');

  req.on('data', (chunk) => {
    postData += chunk;
  });

  req.on('end', (postData) => {
    console.log(postData);
  });
  res.end('hello')
}).listen(8080);
// console.log('success');
// console.log(module.paths);
// console.log(require.extensions);
