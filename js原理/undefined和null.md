JavaScript有两个表示'空'的值，其中比较有用的是`undefined`

`undefined`是一个值为`undefined`的类型

这个语言也定义了一个全局变量，它的值是`undefined`，这个变量也被称为`undefined`，但是这个变量不是一个常量，也不是一个关键字，这意味着它的值可以轻易被覆盖。

下面的情况会返回`undefined`值：

- 访问未修改的全局变量`undefined`
- 由于没有定义return表达式的函数隱式返回
- return表达式没有显式的返回任何内容。
- 访问不存在的属性
- 函数参数没有被显式的传递值
- 任何被设置为`undefined`值的变量

> 处理undefined值的改变

由于全局变量`undefined`只是保存了`undefined`类型实际值的副本，因此对它赋新值不会改变类型`undefined`的值。

然而，为了方便其他变量和`undefined`做比较，我们需要事先获取类型`undefined`的值

为了避免可能对`undefined`值的改变，一个常用的技巧是使用一个传递到**匿名包装器**的额外参数。在调用时，这个参数不会获取任何值

```
var undefined = 123;
(function(something, foo, undefined) {
  console.log(undefined)
   // 局部作用域里的 undefined 变量重新获得了 `undefined` 值
})('hello world', 42);
```
