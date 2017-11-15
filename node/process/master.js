// var fork = require('child_process').fork;
// var cpus = require('os').cpus();
// console.log(cpus);
// for (var i = 0; i < cpus.length; i++) {
//   fork('./worker.js');
// }

var cp = require('child_process');

cp.spwan('node', ['worker.js']);
cp.exec('node worker.js', function(err, stdout, stderr) {
});
cp.execFile('worker.js', function(err, stdout, stderr) {
  // 如果js文件通过execFile()运行，它的首行代码必须添加如下代码
  // #!/usr/bin/env node
});

cp.fork('./worker.js');
