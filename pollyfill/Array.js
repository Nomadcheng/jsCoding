//Array.prototype.join()
function fakeJoin(arr, connector) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    if (i > 0) {
      str += connector;
    }
    if (arr[i] != undefined) {
      str += arr[i];
    }
  }
  return str;
}
