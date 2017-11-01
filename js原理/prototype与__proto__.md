# 原型之间的关系

## 概念

原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与类的继承很相似。原型链的问题是对象实例共享所有继承的是属性和方法，因此不适宜单独使用。解决这个问题的技术是借用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都具有自己的属性，同时还能保证只使用构造函数模式来定义类型。

### 原型对象及prototype

我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由 特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那额prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处就是可以让所有实例共享它所包含的属性和方法，换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

```
function Foo(){};
Foo.prototype.a = 1;
var f1 = new Foo;
var f2 = new Foo;

console.log(Foo.prototype.a);//1
console.log(f1.a);//1
console.log(f2.a);//1
```

#### 理解原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 **prototype** 属性，这个属性指向函数的原型对象。在默认的情况下，所有原型对象都会自动获得一个 **constructor** （构造函数）属性，这个属性包含一个指向所在函数的指针。。而通过这个构造函数，我们还可以继续为原型对象添加其他属性和方法。

```
function Foo(){};
console.log(Foo.prototype.constructor === Foo);//true
```

创建了自定义的构造函数之后，其原型对象默认只会获得 **constructor** 属性；至于其他方法，则都是从Object继承而来的。由于实例对象可以继承原型对象的属性，所以实例对象也拥有constructor属性，同样指向原型对象对应的构造函数

```
function Foo(){};
var f1 = new Foo;
console.log(f1.constructor === Foo);//true
```

当调用构造函数创建一个新实例后，该实例内部将包含一个指针（内部属性），指向构造函数的原型对象[[Prototype]]。虽然脚本中没有标准的方式访问[[Prototype]]，但是主流浏览器子啊每个对象上都支持一个属性 `__proto__` ;而在其他实现中，这个属性对脚本ze则是完全不可见的。不过，要明确的真正重要的一点就是，**这个连接存在与实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间。**

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

`__proto__`是可设置属性，之前的代码中使用 ES6 的 Object.setPrototypeOf(..) 进行设 置。然而，通常来说你不需要修改已有对象的 [[Prototype]]。

##### 原型与in操作符

有两种方法使用in操作符，单独使用和在for-in循环中使用。在单独使用时，in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。

由于in操作符只要通过对象能够访问到属性就返回true，hasOwnProperty（）只在属性存在与实例中时才返回true，因此只要in操作符返回true而hasOwnProperty()返回false，就可以确定属性是原型中的属性。

```
function Person() {}

Person.prototype = {
  name: 'Nicholas',
  age: 29,
  sayName: function() {
    console.log(this.name);
  }
};

var person1 = new Person();

console.log(person1.hasOwnProperty("name")); //false
console.log("name" in person1); //true
console.log(hasPrototypeProperty(person1, "name"));//true;
person1.name = "Gred";
console.log(hasPrototypeProperty(person1, "name"));//false
```

在使用for-in循环时，返回的是所有能够通过对象访问的、可枚举(emumerated)的属性，其中即包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性（即将Enumerable标记为false的属性）的实例也会在for-in循环中返回，因此规定，所有开发人员定义的属性都是可枚举的。

要取得对象上所有可枚举的实例属性，可以使用ES5的Object.keys()方法，这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

```
function Person() {}

Person.prototype = {
  name: 'Nicholas',
  age: 29,
  sayName: function() {
    console.log(this.name);
  }
};

var person1 = new Person();
person1.name = "Rob";
person1.age = 31;

var keys = Object.keys(Person.prototype);
console.log(keys); //name,age,sayName
var p1keys = Object.keys(person1);
console.log(p1keys); //name,age
```

如果你想得到所有实例属性，无论它是否可枚举，都可以使用Object.getOwnPropertyNames();

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

单纯创建一个对象，不用构造函数的话，函数本身只具有`.__proto__`,可以通过`__proto__`进行继承，prototype在.constructor之后，指向Object.prototype,

```
var parent = {a:1}
var child = Object.create(parent);
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

### 语法糖类的prototype属性和`__proto__`

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和`__proto__`属性，因此同时存在两条继承链。

- 子类的`__proto__`属性，表示构造函数的继承，总是指向父类
- 子类的prototype属性的`__proto__`属性，表示方法的继承，总是指向父类的prototype属性

```
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（**proto**属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
