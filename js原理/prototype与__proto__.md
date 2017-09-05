# 原型之间的关系

## 概念

```
function Foo(){};
var f1 = new Foo;
```

### 原型对象及prototype

构造函数有一个prototype属性，指向实例对象的原型对象，通过一个构造函数实例化的多个对象具有相同的原型对象，于是经常使用原型对象来实现继承

```
function Foo(){};
Foo.prototype.a = 1;
var f1 = new Foo;
var f2 = new Foo;

console.log(Foo.prototype.a);//1
console.log(f1.a);//1
console.log(f2.a);//1
```

### constructor

原型对象有一个constructor属性，指向该原型对象对应的构造函数

```
function Foo(){};
console.log(Foo.prototype.constructor === Foo);//true
```

由于实例对象可以继承原型对象的属性，所以实例对象也拥有constructor属性，同样指向原型对象对应的构造函数

```
function Foo(){};
var f1 = new Foo;
console.log(f1.constructor === Foo);//true
```

### `__proto__`

```
function Foo(){};
var f1 = new Foo;
Object.getPrototypeOf(f1) === Foo.prototype //true
f1.__proto__ === Foo.prototype;//true
```

在ES6之前，我们只能通过设置`.__proto__`属性来实现，但是这个方法并不是标准并且无法兼容所有浏览器，ES6添加了辅助函数Object.setPrototypeOf(..)，可以用标准并且可靠的方法来修改关联

这个奇怪的属性竟然神奇地引用了内部的[[Prototype]]对象，和.constructor一样`.__proto__`（ES6之前并不是标准）实际上并不存在于你正在使用的对象中（本例是f1），实际上，它和其他的常用函数(.toString(),.isPrototypeOf())一样内置于Object。prototyp中。它们是不可枚举的。

此外，`__proto__`看起来很像一个属性，但是实际上它更像一个getter/setter，它的实现大概是这样的

```
Object.defineProperty( Object.prototype, "__proto__", {
    get: function() {
      return Object.getPrototypeOf( this );
    },
    set: function(o) {
      Object.setPrototypeOf( this, o);
      return p;
    }
});
```

.**proto** 是可设置属性，之前的代码中使用 ES6 的 Object.setPrototypeOf(..) 进行设 置。然而，通常来说你不需要修改已有对象的 [[Prototype]]。

## 说明

### Foo

实例对象f1是通过构造函数Foo()的new操作创建的，构造函数Foo()原型对象是Foo.prototype；实例对象f1通过`__proto__`'属性'也指向原型对象Foo.prototype

```
function Foo(){};
var f1 = new Foo;
console.log(f1.__proto === Foo.prototype);//true
```

实例对象f1本身并没有constructor属性，但它可以继承原型对象Foo.prototype的constructor属性

```
function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.constructor === Foo);//true
console.log(f1.constructor === Foo);//true
console.log(f1.hasOwnProperty('constructor'));//false
```

### Object

Foo.prototype是f1的原型对象，同时它也是实例对象。实际上，任何对象都可以看做是通过Object()构造函数的new操作实例化的对象

所以，Foo.prototype作为实例对象，它的构造函数是Object()，原型对象是Object.prototype。相应地，构造函数Object()的prototype属性指向原型对象Object.prototype；实例对象Foo.prototype的proto属性同样指向原型对象Object.prototype

```
function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.__proto__ === Object.prototype);//true
```

实例对象Foo.prototype本身具有constructor属性，所以它会覆盖继承自原型对象Object.prototype的constructor属性

```
function Foo(){};
var f1 = new Foo;
console.log(Foo.prototype.constructor === Foo);//true
console.log(Object.prototype.constructor === Object);//true
console.log(Foo.prototype.hasOwnProperty('constructor'));//true
```

如果Object.prototype作为实例对象的话，其原型对象是什么，结果是null。

```
console.log(Object.prototype.__proto__ === null);//true
```

单纯创建一个对象，不用构造函数的话，函数本身只具有`.__proto__`,可以痛过`__proto__`进行继承，prototype在.constructor之后，指向Object.prototype,

```
var parent = {a:1}
var child = Object.create(parent);
child.__proto__ //{a:1}
parent.__proto__ === parent.constructor.prototype //true
child.__proto__ === parent //true;
parent.__proto__ === Object.prototype //true
```

### Function

前面已经介绍过，函数也是对象，只不过是具有特殊功能的对象而已。任何函数都可以看做是通过Function()构造函数的new操作实例化的结果

如果把函数Foo当成实例对象的话，其构造函数是Function()，其原型对象是Function.prototype；类似地，函数Object的构造函数也是Function()，其原型对象是Function.prototype

```
function Foo(){};
var f1 = new Foo;
console.log(Foo.__proto__ === Function.prototype);//true
console.log(Object.__proto__ === Function.prototype);//true
```

原型对象Function.prototype的constructor属性指向构造函数Function()；实例对象Object和Foo本身没有constructor属性，需要继承原型对象Function.prototype的constructor属性

```
function Foo(){};
var f1 = new Foo;
console.log(Function.prototype.constructor === Function);//true
console.log(Foo.constructor === Function);//true
console.log(Foo.hasOwnProperty('constructor'));//false
console.log(Object.constructor === Function);//true
console.log(Object.hasOwnProperty('constructor'));//false
```

所有的函数都可以看成是构造函数Function()的new操作的实例化对象。那么，Function可以看成是调用其自身的new操作的实例化的结果

所以，如果Function作为实例对象，其构造函数是Function，其原型对象是Function.prototype

```
console.log(Function.__proto__ === Function.prototype);//true
console.log(Function.prototype.constructor === Function);//true
console.log(Function.prototype === Function.prototype);//true
```

如果Function.prototype作为实例对象的话，其原型对象是什么呢？和前面一样，所有的对象都可以看成是Object()构造函数的new操作的实例化结果。所以，Function.prototype的原型对象是Object.prototype，其原型函数是Object()

```
console.log(Function.prototype.__proto__ === Object.prototype);//true
```
