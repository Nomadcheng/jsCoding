function SuperType() {
  this.numbers = [1, 2, 3, 4]
}

SuperType.prototype.getSuperValue = function() {
  return this.numbers;
}

function SubType() {
  this.subNumbers = [1];
}
//继承
SubType.prototype = new SuperType();

//添加新方法
SubType.prototype.getSubValue = function() {
    return this.subNumbers;
  }
  //重写超类型中的方法
SubType.prototype.getSuperValue = function() {
  return false;
}

//原行链的问题
var instance1 = new SubType();
instance1.numbers.push(4); //1,2,3,4

var instance2 = new SubType();
instance2.numbers; //1,2,3,4
