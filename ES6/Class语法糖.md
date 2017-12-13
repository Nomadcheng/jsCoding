> this的 指向

类方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错

```
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。

```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  // ...
}
```

另一种解决方法是使用箭头函数

```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }
  print(text) {
    console.log(text);
  }
}
```

还有一种解决是使用Proxy，获取方法的时候，自动绑定this。

```
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

> Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法"。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() //'heelo'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
```

上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()),而不是在Foo类上调用（Foo.classMethod())，而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法

注意，如果静态方法包含this关键字，这个this指的是类，而不是实例

```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() //hello
```

上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

静态方法也是可以从super对象上调用的

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

> Class的静态属性和实例属性

静态属性指的是Class本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性

```
class Foo {
}
Foo.prop = 1;
Foo.prop; // 1
```

上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

> new.target属性

new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

Class 内部调用new.target，返回当前 Class。

```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，new.target会返回子类。

```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false
```

利用这个特点，**可以写出不能独立使用、必须继承后才能使用的类。**

```
class Shape {
  constructor() {
    if(new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

上面代码中，Shape类不能被实例化，只能用于继承。注意，在函数外部，使用new.target会报错。

> calss继承

子类必须在constructor方法中调用super方法，否则新建实例会报错，这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

```
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）。ES6的继承机制则完全不同，实质上是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this

如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

```
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = x;
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color;
    super(x, y);
    this.color = color; //正确
  }
}
```

上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。

```
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。

> super关键字 super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同

第一种情况，super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数。

```
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则JS引擎会报错。

注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指向的是B，因此super()在这里相当于`A.prototype.constructor.call(this)`

```
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constuctor() {
    super();
  }
}
new A() // A
new B() // B
```

上面代码中，new.target指向当前正在执行的函数。可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super()内部的this指向的是B。

作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

```
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

第二种情况，super作为对象，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constuctor() {
    super();
    console.log(super.p()); //2
  }
}

let b = new B();
```

上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。

这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

```
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}
let b = new B();
b.m // undefined
```

上面代码中，p是父类A实例的属性，super.p就引用不到它。

如果属性定义在父类的原型对象上，super就可以取到。

```
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();
```

由于this指向子类，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

```
class A {
  class A {
    constructor() {
      this.x = 1;
    }
  }

  class B extends A {
    constructor() {
      super();
      this.x = 2;
      console.log(this.x); // 2
      super.x = 3;
      console.log(super.x); // undefined
      console.log(this.x); // 3
    }
  }

  let b = new B();
```

上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象

```
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

最后，由于对象总是继承其他对象的，所以可以在任何一个对象中，使用super关键字

```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

> 类的prototype属性和`__proto__`属性

大多数浏览器的ES5实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖同时有prototype属性和`__proto__`属性，因此同时存在两条继承链。

1. 子类的`__proto__`属性，表示构造函数的继承，总是指向父类
2. 子类prototype属性的`__proto__`属性，表示方法的继承，总是指向父类的prototype属性

```
class A {}
class B extends A {}

B.__proto__
// [Function: A]
B.__proto__ === A
// true
B.prototype.__proto__
// A {}
B.prototype.__proto__.constructor
// [Function: A]
B.prototype.__proto__.constructor === A
// true
```

上面代码中，子类B的`__proto__`属性指向父类A，子类B的prototype属性的`__proto__`属性指向父类A的prototype属性

这样的结果是因为，类的继承是按照下面的模式实现的

```
class A {}
class B {}
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

// B 的实例继承 A 的静态属性
Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;

const b = new B();
```

这两条继承链，可以这样理解：作为一个对象，子类（B）的原型(`__proto__`属性)是父类(A);作为一个构造函数，子类(B)的原型对象(prototype属性)是父类的原型对象(prototype属性)的实例。

```
Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

> extends 的继承目标

extends关键字后面可以跟多种类型的值

```
class B extends A {}
```

上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数

下面讨论三种特殊情况

第一种特殊情况，子类继承Object类

```
class A extends Object {
}
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

第二种特殊情况，不存在任何继承

```
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A作为一个基类，就是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回一个空对象（即Object实例），所以`A.prototype.__proto__`指向构造函数（Object）的prototype属性。

第三种特殊情况，子类继承null

```
class A extends null {}

A.__proto__ === Function.prototype //true
A.prototype.__proto__ === undefined //true
```

这种情况与第二种情况非常像。A也是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回的对象不继承任何方法，所以它的`__proto__`指向Function.prototype，即实质上执行了下面的代码。

```
class C extends null {
  constructor() { return Object.create(null); }
}
```

> 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。以前这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类

ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性DefineOwnProperty，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常

但是ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子

```
class MyArray extends Array {
  constructor(..args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length //1

arr.length = 0;
arr[0] // undefined
```

上面的例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

```
class VersionArray extends Array {
  constuctor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}
var x = new VersionArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]
```

上面代码中，VersionedArray会通过commit方法，将自己的当前状态生成一个版本快照，存入history属性。revert方法用来将数组重置为最新一次保存的版本。除此之外，VersionedArray依然是一个普通数组，所有原生的数组方法都可以在它上面调用。

注意，继承Object的子类，有一个行为差异

```
class NewObj extends Object {
  constructor() {
    super(...arguments);
  }
}
var o = NewObj({attr: true});
o.attr === true // false
```

上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。

> Mixin 模式的实现

Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

```
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```

上面代码中，c对象是a对象和b对象的合成，具有两者的接口。

下面是一个更完备的实现，将多个类的接口"混入"（mix in）另一个类。

```
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); //拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
