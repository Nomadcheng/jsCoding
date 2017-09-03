// 寄生式继承是与原型式继承紧密相关的一种思路，寄生式与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数
var person = {
  name: "chen",
  numbers: [1,2,3]
};

function createAnother(original) {
  var clone = Object.create(original);
  clone.sayHi = function() {
    console.log('hi');
  };
  return clone;
}

var instance = createAnother(preson);
instance.sayHi(); //hi

// 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似
