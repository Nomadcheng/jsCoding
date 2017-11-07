//Date.now()返回时间戳
if (!Date.now) {
  Date.now = function() {
    return +new Date();//或者
    return new Date().getTime();
  }
}
