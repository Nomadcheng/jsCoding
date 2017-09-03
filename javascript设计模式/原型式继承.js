// 这种方法并没有使用严格意义上的构造函数，主要借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型，如下
function object(o) {
  function F(){};
    F.prototype = o;
    return new F();
}
// ES5的Object.create()方法规范化了原型链式继承，这两个方法接收两个参数：一个用作新对象原型的对象和（可选的）
// 一个为新对象定义额外属性的对象。
var person = {
  name: "chen",
  numbers: [1,2,3]
};

var instance1 = Object.create(person);
instance1.name = 'Nomad';
instance1.numbers.push(4);

var instance2 = Object.create(person);
instance2.name = 'Nomadchan';
instance2.numbers.push(5);

console.log(person.numbers);//1,2,3,4,5
