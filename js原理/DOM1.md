> Node 类型

要了解节点的具体信息，可以使用nodeName和nodeValue这两个属性。这个两个属性的值完全取决于节点的类型。在使用这两个值之前，最好先检测以下节点的类型

```
if(someNode.nodeType == 1) {
  value = someNode.nodeName; /nodeName的值是元素的标签名
}
```

对于元素节点，nodeName中保存的始终都是元素的标签名，而nodeValue的值则始终为null。

每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点，请注意，它并不是Array的实例，NodeList的独特指出在于，它实际上是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映在NodeList对象中。

```
//转为数组的方法
function convertToArray(nodes) {
  var array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0); // 针对非IE浏览器
  } catch(ex) {
    array = new Array();
    for (var i = 0; len = nodes.length; i < len; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}
```

每个节点都有一个parentNode属性，该属性指向文档树中的父节点。包含在childNodes列表中的所有节点都具有相同的父节点，因此它们的parentNode属性都指向同一个节点。可以通过previousSibling和nextSibling访问同一列表中的其他节点。列表中第一个节点的previousSibling为null，最后一个节点的nextSibling同样为null。此外还有firstChild和lastChild

操作节点的方法

- appendChild()
- insertBefore()
- replaceChild()
- cloneNode()

> Document 类型
