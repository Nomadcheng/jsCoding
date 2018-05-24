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
  Array.from ? Array.from : obj => [].slice.call(obj)
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
// 在数组中查找所有出现的x，并返回一个包含索引的数组
function findall(a, x) {
  var results = [],
      len = a.length;
      pos = 0;
  while(pos < len) {
    pos = a.indexOf(x, pos);
    if(pos === -1) break;
    results.push(pos);
    pos = pos + 1;
  }
  return results;
}
// ES5 isArray
var isArray = Function.isArray || function(o) {
  return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]"
}
/*
** Array.prototype.map
*/
var map = Array.prototype.map
    ? function(a, f) { return a.map(f); }
    : function(a, f) {
      var results = [];
      for(var i = 0, len = a.length; i < len; i++) {
        // 跳过undefined
        if(i in a) results[i] = f.call(null, a[i], i, a);
      }
      return results;
    }
/*
** Array.prototype.reduce
*/
var reduce = Array.prototype.reduce
    ? function(a, f, initial) {
      if(arguments.length > 2)
          return a.reduce(f, initial); //如果传入了一个初使值
          else return a.reduce(f);     //否则没有初始值
    }
    : function(a, f, initial) {
      var i = 0, len = a.length, accumulator;

      // 以特定的初始值开始，否则第一个值取自a
      if(arguments.length > 2) {
        accumulator = initial;
      } else {
        if (len == 0) throw TypeError();
        while(i < len) {
          // 跳过undefien和empty
          if(i in a) {
            accumulator = a[i++];
            break;
          }
          else i++;
        }
        if(i == len) throw TypeError();
      }
      // 对数组中剩下的元素依次调用f()
      while(i < len) {
        if(i in a)
            accumulator = f.call(undefined, accumulator, a[i], i, a);
        i++;
      }
      return accumulator;
    };
