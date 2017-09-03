function SuperType() {
  this.name = name;
  this.numbers = [1, 2, 3];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
}

function SubType(name, age) {
  //继承了SuperType同时还传递了参数
  //第二次次调用SuperType
  SuperType.call(this, name);

  //实例属性
  this.age = age;
}

//继承方法 第一次调用SuperType
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age);
}

var instance1 = new SubType('chen', 29);
instance1.numbers.push(4);
console.log(instance1.numbers); //1,2,3,4
instance1.sayName(); //'chen'
instance1.sayAge(); //29

var instance1 = new SubType('Greg', 27);
console.log(instance1.numbers); //1,2,3
instance1.sayName(); //'Greg'
instance1.sayAge(); //27
