function Person (){}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Spftware Engineer';
Person.prototype.sayNmae = function() {
 alert(this.name);
};

var person1 = new Person();
person1.sayName(); //'Nicholas'

var person2 = new Person();
person2.sayName(); //'Nicholas'
alert(person1.sayName == person2.sayName); //true

//可以用ES5中的getPrototypeOf方法检测
alert(Object.getPrototypeOf(person1) === Person.prototype);//true
alert(Object.getPrototypeOf(person1).name) //'Nicholas'

person1.name ="chen";
alert(person1.name); //chen is from 实例
delete person1.name;
alert(person1.name); //chen is from prototype

//更简单的原型语法
function Person(){}

Person.prototype = {
  name : 'Nicholas',
  age : 29,
  job : 'Software Engineer',
  sayNmae : function () {
      alert(this.name);
};
};

var friend = new Person();
alert(friend.constructor == Person); //false

//但是因为这种对象字面量形式却重写了prototype对象，因此constructor属性就编程了新的对象的constructor属性（指向Object）
//如果构造函数很重，你可以这样设置
function Person(){}

Person.prototype = {
  constructor : Person,
  name : 'Nicholas',
  age : 29,
  job : 'Software Engineer',
  sayNmae : function () {
      alert(this.name);
};
};
//because the rewire like above will make the Enumerable be true, so you can use the Object.defineProperty() in ES5 like this

var friend = new Person();
alert(friend.constructor == Person); //true

Object.defineProperty(Person.prototype, 'construtor', {
  enumerable: false,
  value: Person
});

//原型对象的问题
function Person() {}
var friend = new Person();
Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software',
  friends: ["Shelby", "Court"],
  sayName: function () {
  alert(this.name);
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push('Van');

alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true
