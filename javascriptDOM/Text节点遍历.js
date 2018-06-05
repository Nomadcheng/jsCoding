// 返回元素e的纯文本内容，递归进入其子元素
// 该方法的效果类似textContent属性
function textContent(e) {
  var child, type, s= ""; //s保留所有子节点的文本
  for(child = e.firstChild; child != null; child = child.nextSibling){
    type = child.nodeType;
    if(type === 3 || type === 4) //Text和CDTASection节点
      s += child.nodeValue;
    else if (type === 1)         //递归Element节点
      s += textContent(child);
  }
}

// 表格的行排序
// 根据指定表格每行第n个单元格的值，对第一个<tbody>中的行进行排序
// 如果存在comparator函数则使用它，否则按字母表顺序进行比较
function sortrows(table, n, comparator) {
  var tbody = table.tBodies[0];
  var rows = tbody.getElementsByTagName("tr"); //所有行
  rows = Array.prototype.slice.call(rows, 0);

  // 基于第n个<td>元素的值对行排序
  rows.sort(function(row1, tow2) {
    var cell1 = row1.getElementsByTagName("td")[n]; //获得第n个单元格
    var cell2 = row2.getElementsByTagName("td")[n];
    var val1 = cell1.textContent || cell1.innerText;
    var val2 = cell2.textContent || cell2.innerText;
    if (comparator) return comparator(val1, val2); //进行比较
    if (val1 < val2) return -1;
    else if (val1 > val2) return 1;
    else return 0;
  });
  // 在tbody中按它们的顺序把行添加到最后
  // 这将自动把它们从当前位置移走，故没必要预先删除它们
  // 如果<tbody>还包含了除<tr>的任何其他元素，这些节点将会悬浮到顶部位置
  for (var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}

// 查找表格<th>元素（假设只有一行），让它们可单击
// 以便单击咧标题，按该列对行排序
function makeSortable(table) {
  var headers = table.getElementsByTagName("th");
  for(var i = 0; i < headers.length; i++) {
    (function(n) {
      // 嵌套函数来创建本地作用域
      headers[i].onclick = function() {
        sortrows(table, n);
      };
    }(i)); //将i赋值给局部变量n
  }
}
