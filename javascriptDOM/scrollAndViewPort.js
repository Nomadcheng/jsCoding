// 文档位置
function getScrollOffsets (w) {
  w = w || window;
  // 除了IE 8及更早的版本外，其他浏览器都能用
  if(w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

  // 从标准模式下的IE（或任何浏览器）
  let d = w.document;
  if(document.compatMode == "CSS1Compat") return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

  // 对怪异模式下的浏览器
  return {x: d.body.scrollLeft, y: d.body.scrollTop};
}
// 视口大小
function getViewPortSize(w) {
  w = w || window;
  // 除了IE 8及更早的版本外，其他浏览器都能用
  if(w.innerWidth != null) return {w: w.innerWidth, h: w.innerHeight};

  let d = w.document;
  if(document.compatMode == "Css1Compat") return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

  // 对怪异模式下的浏览器
  return {w: d.body.clientWidth, h: d.body.clientHeight};
}
function getBoundingClient() {
  let item = document.querySelector('.block1');
  let box = item.getBoundingClientRect();
  return box;
}
