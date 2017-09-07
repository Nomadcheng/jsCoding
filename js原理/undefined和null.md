JavaScript有两个表示'空'的值，其中比较有用的是`undefined`

`undefined`是一个值为`undefined`的类型

这个语言也定义了一个全局变量，它的值是`undefined`，这个变量也被称为`undefined`，但是这个变量不是一个常量，也不是一个关键字，这意味着它的值可以轻易被覆盖。

下面的情况会返回`undefined`值：

- 访问未修改的全局变量`undefined`
- 变量被声明了，但没有赋值，就等于`undefined`
- 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
- 对象没有赋值的属性，为`undefined`
- 函数没有返回值时，默认返回`undefined`

```
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```

> 处理undefined值的改变

由于全局变量`undefined`只是保存了`undefined`类型实际值的副本，因此对它赋新值不会改变类型`undefined`的值。

然而，为了方便其他变量和`undefined`做比较，我们需要事先获取类型`undefined`的值

为了避免可能对`undefined`值的改变，一个常用的技巧是使用一个传递到**匿名包装器**的额外参数。在调用时，这个参数不会获取任何值

```
var undefined = 123;
(function(something, foo, undefined) {
  console.log(undefined);//undefined
   // 局部作用域里的 undefined 变量重新获得了 `undefined` 值
})('hello world', 42);
```

另外一种达到相同目的的方法是在函数内使用变量声明

```
var undefined = 123
(function(something, foo) {
  var undefined;
  ...
})('hello world',42);
```

这里唯一的区别是，在压缩后并且函数内没有其他需要使用`var`声明变量的情况。

> null的用处

JavaScript中的`undefined`的使用场景类似于其他语言中的`null`,实际上JavaScript中的`null`是另外一种数据类型

它在 JavaScript 内部有一些使用场景（比如声明原型链的终结`Foo.prototype = null`），但是大多数情况下都可以使用`undefined`来代替。

> undefined与null的区别

```
Number(null) //0
5 + null //5

Number(undefined) //NaN
5 + undefined //NaN
```
