/*
** 可以判断大部分值的类型的type()函数
*/
function type(o) {
  var t, c, n; //type, class, name
  // 处理null值的特殊情况
  if(o === null) return "null";

  // 另一种特殊情形，NaN和它自身不等
  if(o !== o) return "nan";

  // 如果typeof的值不是"object"，则使用这个值
  // 这可以识别出原始值的类型和函数
  if ((t = typeof o) !== "object") return t;

  // 返回对象的类名，除非值为“Object”
  // 这种方式可以识别出大多数的内置对象
  if((c = classof(o) !== "Object")) return c;

  // 如果对象的构造函数的名字存在的话，则返回它
  if (o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName())) return n;

  // 其他类型都无法识别，一律返回Object
  return "Object";
}
