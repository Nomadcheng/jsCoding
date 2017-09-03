// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型，寄生组合式继承的基本模式如下
function inheritPrototype(subType, superType) {
  var prototype = Object(superType.prototype); //创建对象
  prototype.constructor = subType; //增强对象
  subType.prototype = prototype;  //指定对象
}

//例子
function SuperType(){
  this.name = name;
  this.numbers = [1,2,3];
}
SuperType.prototype.sayName = function(){
  console.log(this.name);
}

function subType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  console.log(this.age);
}
