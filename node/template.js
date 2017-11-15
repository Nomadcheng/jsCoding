var render = function(str, data) {
  // 模版技术，就是替换特殊标签的技术
  var tpl = str.replace(/\n/g, '\\n') //将换行符替换
  .replace(/<%=([\s\S]+?)%>/g, function (match, code) {
    // 转义
    return "' + escape(" + code + ") + '";
  }).replace(/<%=([\s\S]+?)%>/g, function (match, code) {
    // 正常输出
    return "' + " + code + "+ '";
  });
  tpl = "tpl = '" + tpl + "'";
  tpl = 'var tpl = "";\nwith (obj) {' + tpl + '}\nreturn tpl;';
  // 加上escape()函数
  return new Function('obj', 'escape', tpl);
};

var tpl = 'Hello <%=username%>.';
console.log(render(tpl), {username: 'Jackson Tian'});
