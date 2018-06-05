// 事件捕获提供了在事件没有送达目标之前查看它们的机会。事件捕获能用于程序调试，或用于后面介绍的事件取消技术，
// 过滤掉事件从而使目标事件处理程序绝不会被调用。事件捕获常用于处理鼠标拖放，因为要处理拖放事件的位置不能是
// 这个元素内部的子元素

/*
** Drag.js：拖动绝对定位的HTMl元素
** 这个模块定义了一个drag()函数，它用于mousedown事件处理程序的调用
** 随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
**
** 参数
** elementToDrag: 接收mousedown事件的元素或某些包含元素
** 它必须是绝对定位的元素
** 它的style.left和style.top值将随着用户的拖动而改变
**
** event：mousedown事件对象
*/
function drag(elementToDrag, event) {
  console.log(event)
  // 初始鼠标位置，转换为文档坐标
  var scroll = getScrollOffsets();
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;

  // 在文档坐标下，待拖动元素的初始位置
  // 因为elementToDrag是绝对定位的
  // 所以我们可以假设它的offsetParent就是文档的body元素
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  console.log(origX, origY);

  // 计算mousedown事件和元素左上角之间的距离
  // 我们将它另存为鼠标移动的距离
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  console.log(deltaX, deltaY);

  // 注册用于响应接着mousedown事件发生的mousemove和mouseup事件的事件处理程序
  if(document.addEventListener) {
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);
  } else if(document.attachEvent) { //用于IE5~IE8的事件模型
    // 在IE事件模型中
    // 捕获事件是通过调用元素上的setCapture()捕获它们
    elementToDrag.setCapture();
    elementToDrag.attachEvent("onmousemove", moveHandler);
    elementToDrag.attachEvent("onmouseup", upHandler);
    // 作为mouseup事件看待鼠标捕获的丢失
    elementToDrag.attachEvent("onlosecapture", upHandler);
  }
  // 我们处理了这个事件，不让其他元素看到它
  if(event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;

  // 现在阻止任何默认操作
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;

  // 当元素正在被拖动时，这就是捕获mousemove事件的处理程序
  // 它用于移动这个元素
  function moveHandler(e) {
    if(!e) e = window.event; //IE事件模型

    // 移动这个元素到当前鼠标位置
    // 通过滚动条的位置和初始单击的偏移量来调整
    var scroll = getScrollOffsets();
    elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
    elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";

    // 同时不让任何其他元素看到这个事件
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true; //IE
  }

  // 这是捕获在拖动结束时发生的最终mouseup事件的处理程序
  function upHandler(e) {
    e = e || window.event;

    // 注销捕获事件处理程序
    if(document.removeEventListener) { //DOM事件模型
      document.removeEventListener("mouseup", upHandler, true);
      document.removeEventListener("mousemove", moveHandler, true);
    } else if(document.detachEvent) {
      elementToDrag.detachEvent("onlosecapture", upHandler);
      elementToDrag.detachEvent("onmouseup", upHandler);
      elementToDrag.detachEvent("onmousemove", moveHandler);
      elementToDrag.releaseCapture();
    }

    // 并且不让事件进一步传播
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
}
