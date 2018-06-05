// 将对象o中名为m()的方法替换为另一个方法
// 可以在调用原始的方法之前和之后记录日志消息
function trace(o, m) {
  var original = o[m];   //在闭包中保存原始方法
  o[m] = function() {
    console.log(new Date(), "Entering:",m);
    var result = original.apply(this, arguments); //调用原始函数
    console.log(new Date(), "Exiting:", m);
    return result;
  }
}
var  o = {
  a: 15,
  m: function() {
    console.log(this.a);
  }
}
tarce(o,"m");
o.m();
// console
2018-05-24T05:48:03.905Z 'Entering:' 'm'
15
2018-05-24T05:48:03.906Z 'Exiting:' 'm'


function f(y,z) {return this.x + y + z};
var g = f.bind({x: 1}, 2);
g(3); //6
/*
** isFunction()
*/
function isFunction(x) {
  return Object.prototype.toString.call(x) === "[object Function]"
}
/*
** 不完全函数
** 实现一个工具函数将类数组对象(或对象)转换为真正的数组
*/
function array(a, n) {return Array.prototype.slice.call(a, n || 0);}
// 这个函数的实参传递至左侧
function partialLeft(f /*, args*/) {
  var args = arguments;
  return function() {
    var a = array(args, 1);  //开始处理外部的第一个args
    a = a.concat(array(arguments)); //然后增加所有内部的实参
    return f.apply(this, a); //最后基于这个实参列表调用f
  }；
}
// 这个函数的实参传递至右侧
function partialRight(f /*, args*/) {
  var args = arguments;
  return function() {
    var a = array(arguments);
    a = a.concat(array(args, 1));
    return f.apply(this, a);
  }
}
// 这个函数的实参被用做模版
// 实参列表中的undefined值都被填充
function partial(f /*, args*/) {
  var args = arguments;
  return function() {
    var a = array(args, 1); 从外部args开始
    var i = 0, j = 0;
    // 遍历args，从内部实参填充undefined
    for(; i < a.length; i++) {
      if (a[i] === undefined) a[i] = arguments[j++];
    }
    // 现在将剩下的内部实参都追加进去
    a = a.concat(array(arguments, j));
    return f.apply(this, a);
  };
}
// 使用
var f = function(x, y, z) {return x * (y - z);};
// 注意这三个不完全调用的区别
partialLeft(f, 2)(3, 4) //2*(3-4)
partialRight(f, 2)(3, 4)//3*(4-2)
partial(f, undefined, 2)(3, 4)//3*(2-4)
/*
** memorize,将上次计算的结果缓存起来，
** 本质上是牺牲算法的空间复杂度以换取更优的时间复杂度
** 在客户端编程中代码的执行时间复杂度往往是瓶颈
** 返回f()的带有记忆功能的版本
** 只有当f()的实参的字符串表示都不相同时它才会工作
*/
function memorize(f) {
  var cache = {}; //将值保存在闭包内
  return function() {
    // 将实参转换成字符串形式，并将其用做缓存的键
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if(key in cache) return cache[key];
    else return cache[key] = f.apply(this, arguments);
  }
}
// 展示如何使用缓存,返回两个整数的最大公约数
function gcd(a, b) {
  var t;
  if (a < b) t = b, b = a, a = t;
  while(b != 0) t = b, b = a % b, a = t;
  return a;
}
var gcdmemo = memorize(gcd);
gcdmemo(32748378427149234798324, 324923849238493824092384);
// 当我们写一个递归函数时，往往需要实现记忆功能
// 我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial = memorize(function(n) {
  return (n <= 1) ? 1: n * factorial(n-1);
});
factorial(5); //对于1～4的值也缓存了
