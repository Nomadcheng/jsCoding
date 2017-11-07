> 常用的原生函数有：

- String()
- Number()
- Boolean()
- Array()
- Object()
- Funcion()
- RegExp()
- Date()
- Error()
- Symbol()

> 内部属性[[Class]]

所有typeof返回值为"object"的对象（如数组）都包含一个内部属性[[Class]] (我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性 无法直接访问，一般通过Object.prototype.toString.call(...)来查看 如

```
Object.prototype.toString.call( "abc" ); //"[object String]"
Object.prototype.toString.call( 42 ); //"[object Number]"
Object.prototype.toString.call( true );//"[object Boolean]"
```

上例中基本类型值被各自的封装对象自动包装，所以它们的内部[[Class]]属性值分别为 "String","Number"和"Boolean"

> 封装对象包装

封装对象(object wrapper)扮演着十分重要的角色。由于基本类型值没有。length 和.toString()这样的属性和方法，需要通过封装对象才能访问，此时JS会自动为 基本类型值(box 或者 wrap)一个封装对象

因为浏览器已经为.length这样的常见情况做了性能优化，直接使用封装对象来"提前优化"代码反而会降低执行效率。

一般情况下，我们不需要直接使用封装对象，最好的办法是让JS引擎自己决定什么时候应该使用封装对象。换句话说，就是应该优先考虑使用"abc"和42这样的基本类型值，而不是new String("abc")

> 拆封

如果想要得到封装对象中的基本类型值，可以使用valueOf()函数：

```
var a = new String( "abc" );

a.valueOf(); //"abc"
```

> Date() 和Error()

相较于其他原生构造函数，Date(..) 和 Error(..) 的用处要大很多，因为没有对应的常量 形式来作为它们的替代。

> 原生原型

原生构造函数有自己的.prototype对象，如Array.prototype、String.prototype等，这些对象包含其对应子类型所特有的行为特征。

所有函数都可以调用Funcion.prototype中的apply()、call()和bind()

Function.prototype 是一个函数，RegExp.prototype 是一个正则表达式，而 Array. prototype 是一个数组。是不是很有意思?Function.prototype 是一个空函数，RegExp.prototype 是一个"空"的正则表达式(无 任何匹配)，而 Array.prototype 是一个空数组。对未赋值的变量来说，它们是很好的默认值。例如

```
function isThisCool(vals, fn, rx) {
  vals = vals || Array.prototype;
  fn = fn || Function.prototype;
  rx = rx || RegExp.prototype;

  return rx.test(
      vals.map( fn ).join( "" )
  );
}
isThisCool(); //true
```
