// 本模块为不支持它的浏览器定义了Element.insertAdjacentHTML
// 还定义了一些可移植的HTML插入函数，它们的名字比insertAdjacentHTML更符合逻辑
if (document.createElement("div").insertAdjacentHTML) {
  return {
    before: function(e, h) {e.insertAdjacentHTML("beforebegin",h);},
    after: function(e, h) {e.insertAdjacentHTML("afterend",h);},
    atStart: function(e, h) {e.insertAdjacentHTML("afterbegin",h);},
    atEnd: function(e, h) {e.insertAdjacentHTML("beforeend",h);},
  }
  // 如果没有则自定义
  // 首先定义个工具函数，传入HTML字符串，返回一个DocumentFragment，
  // 它包含了解析后的HTML的表示
  function fragment(html) {
    var elt = document.createElement("div"); //创建空元素
    var frag = document.createDocumentFragment(); //创建空文档片段
    elt.innerHTML = html;        //设置元素内容
    while(elt.firstChild)                      //移动所有的节点
      frag.appendChild(elt.firstChild);        //从elt到frag
    return flag;
  }

  var Insert = {
    bofore: function(elt, html) {
      elt.parentNode.insertBefore(fragment(html), elt);
    },
    after: function(elt, html) {
      elt.parentNode.insertBefore(fragment(html), elt.nextSibling); //elt.nextSibling为Text
    },
    atStart: function(elt, html) {
      elt.insertBefore(fragment(html), elt.firstChild); //elt.firstChild为Text
    },
    atEnd: function(elt, html) {
      elt.appendChild(fragment(html));
    }
  };
  // 基于以上函数实现insertAdjacentHTML
  Element.prototype.insertAdjacentHTML = function(pos, html) {
    switch(pos.toLowerCase()) {

    }
  };
  return Insert; //返回4个插入函数
}
