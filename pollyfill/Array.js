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
// Array.from
const toArrayFrom = (() =>
  Array.from ? Array.from : obj => [].slice.call()
)
// Array.of
function ArrayOf(){
  return [].slice.call(arguments);
}
// Array.prototype.includes()
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
