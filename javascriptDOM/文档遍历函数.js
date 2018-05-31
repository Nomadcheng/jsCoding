/*
** 返回元素e的第n层祖先元素，如果不存在此类祖先或者祖先不是Element
** （例如Document或者DocumentFragment）则返回null
** 如果n为0，则返回e本身，如果n为1（或省略），则返回父元素
** 如果n为2，则返回其祖父元素，依次类推
*/
function parent(e, n) {
  if (n === undefined) n = 1;
  while(n-- && e) e = e.parentNode;
  if(!e || e.nodeType !== 1) return null;
  return e;
}
/*
** 返回元素e的第n个兄弟元素
** 如果n为正，返回后续的第n个兄弟元素
** 如果n为负，返回前面的第n个兄弟元素
** 如果n为0，返回本身
*/
function sibling(e, n) {
  while(e && n !== 0) {
    if(n > 0) {
      if(e.nextElementSibling) e = e.nextElementSibling;
      else
        for(e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)
        // 空循环
      n--;
    } else {
      if(e.previousElementSibling) e = e.previousElementSibling;
      else
        for(e = e.previousSibling; e && e.nodeType !==1; e = e.previousSibling)
        // 空循环
      n++；
    }
  }
  return e;
}
/*
** 返回元素e的第n代子元素，如果不存在则为null
** 复制从后往前计数
*/
function child(e, n) {
  if(e.children) {
    if(n<0) n += e.children.length;
    if(n<0) return null;
    return e.children[n];
  }

  if (n >= 0) {
    if (e.firstElementChild) e = e.firstElementChild;
    else {
      for(e = e.firstChild;  e && e.nodeType !== 1; e = e.firstChild)
      // 空循环
    }
    return sibling(e, n);
  } else {
    if(e.lastElementChild) e = e.lastElementChild;
    else {

    }
  }
}
