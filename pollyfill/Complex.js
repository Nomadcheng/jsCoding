function Complex(real, imaginary) {
  if (isNaN(real) || isNaN(imaginary)) {
    throw new TypeError();
  }
  this.r = real;
  this.i = imaginary;
}
Complex.prototype ={
  constructor: Complex,
  add: function(that) {
    return new Complex(this.r + that.r, this.i + that.i);
  },
  mul: function(that) {
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
  },
  toString: function() {
    return "{" + this.r + "," + this.i + "}";
  },
  equals: function(that) {
    return that != null && that.constructor === Complex && this.r === that.r && this.i === that.i;
  }
};
/*
** 类字段（比如常量）和类方法直接定义为构造函数的属性
** 需要注意的是，类的方法通常不使用关键字this，
** 它们只对其参数进行操作
*/
// 这里预定义了一些对复数运算有帮助的类字段
// 它们的命名全都是大写，用以表明它们是常量
// 还可以设置这些类字段的属性为只读
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

// 这个类方法将由实例对象的toString方法返回的字符串格式解析为一个Complex对象
// 或者抛出一个类型错误异常
Complex.parse = function (s) {
  try {
    var m = Complex._format.exec(s);
    return new Complex(parseFloat(m[1]), parseFloat(m[2]));
  } catch(x) {
    throw new TypeError("Can't parse")
  }
}
// 定义类的“私有字段”，类内部使用
Complex._format = /^\{([^,]+),([^}]+)\}$/;
