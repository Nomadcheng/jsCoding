process.on('message', function(m) {
  console.log('CHILD got message:', m);
});
// console.log(process);
process.send({foo: 'bar'});
