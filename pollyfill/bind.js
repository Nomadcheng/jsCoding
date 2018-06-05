/*
** 返回一个函数，通过它来调用o中的方法f()，传递它的所有的实参
*/
function bind(f, o) {
  if (f.binf) return f.bind(o);
  else return function() {
    return f.apply(o, arguments);
  };
}
/*
** ES3版本的Function.bind()方法
*/
if(!Function.prototype.bind) {
  Function.prototype.bind = function(o /*, args*/ ) {
    // 将this和arguments的值保存至变量中
    // 以便在后面嵌套的函数中可以使用他们
    var self = this, boundArgs = arguments;
    // bind()方法返回值是一个函数
    return function() {
      // 创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
      var args = [], i;
      for(i = 1; i < boundArgs; i++) args.push(boundArgs[i]);
      for(i = 1; i < arguments.length; i++) args.push(arguments[i]);
      // 现在将self作为o的方法来调用，传入这些实参
      return self.apply(o, args);
    }
  }
}

// 使用
var sum = function(x, y, z) {return x + y};
var g = f.bind(null, 1);
g(2,3); //6
