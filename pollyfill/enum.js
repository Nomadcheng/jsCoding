// 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
// 返回值是一个构造函数，它标识这个新类
// 返回构造函数包含名/值对的映射表
// 包括由值组成的数组，以及一个foreach迭代
function enumeration(namesTovalues) {
  // 这个虚拟的构造函数是返回值
  var enumeration = function () {throw "can't Instantiate Enumerations";};

  // 枚举值继承自这个对象
  var proto = enumeration.prototype = {
    constructor: enumeration,
    toString: function () { return this.name; },
    valueOf: function () {return this.value;},
    toJSON: function () {return this.name;}
  };

  enumeration.values = [];  //用以存放枚举对象的数组

  // 现在创建新类型的实例
  for (name in namesTovalues) {
    var e = inherit(proto);
  }
}
