javascript中的值可以分为以下两类：

1. 可以被强制类型转换为false的值
2. 其他（被强制转换为false的值）

以下这些是假值：

- undefined
- null
- false
- +0,-0,NaN
- ""

看似假值却是真值的：

- "false"
- "0"
- "''"
- []
- {}
- function(){}
