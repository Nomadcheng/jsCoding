function SuperType(){
  this.numbers = [1,2,3,4]
}

function SubType(){
  //继承了SuperType
  // 因为SuperType.prototype.constructor === 因为SuperType
  SuperType.call(this);
}

var instance1 = new SubType();
instance1.numbers.push(4); //1,2,3,4

var instance2 = new SubType();
instance2.numbers; //1,2,3

//还可以在子类型构造函数中向超类型构造函数传递参数，
function SuperType(name){
  this.name = name;
}
function SubType() {
  //继承了SuperType同时还传递了参数
  SuperType.call(this, 'chen');

  //实例属性
  this.age = 20;
}

var instance = new SubType();
console.log(instance.name);
console.log(instance.age);
