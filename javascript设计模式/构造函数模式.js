function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    alert(this.name);
  };
};
// 构造函数函数名始终以大写字母开头，而非构造函数始终以小写字母开头，主要是为了区别ES中的其他函数

//当构造函数使用
var person1 = new Person('Nicholas', 23, Software Engineer);
//当做普通函数调用
Person("kai", 27, "Doctor"); //添加到window
window.sayName(); //kai
//在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); //"Kristen"

//创建两个完成同样任务的Function实例的确没有必要，况且this对象在，根本不用在执行代码前就把函数绑定到特定的对象上面。
//因此可以通过函数定义转移到构造函数外部来解决这个问题

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName
};

function sayName() {
  alert(this.name);
};
};

var person1 = new Person('Nicholas', 23, Software Engineer);
