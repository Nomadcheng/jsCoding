
/*请完成下面这个函数，实现题目要求的功能
当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^
******************************开始写代码******************************/
function toUpperCase(data) {
  var newData = {};
  //判断如果是number,string,null,false,true则返回原数据
  if (typeof data === 'string' || typeof data === 'number' || data === null || typeof data === 'boolean') {
    return data;
  }
	for (var a in data) {
    var item = data[a];
    if(item instanceof Array) {
      for(var i = 0; i<item.length; i++) {
        item[i] = toUpperCase(item[i]);
      }
    } else if(item instanceof Object && item !== null) {
      item = toUpperCase(item)
    }
    //将key首字母大写
	  a = a.slice(0, 1).toUpperCase() + a.slice(1);
    newData[a] = item;
	}
  return newData;
}
/******************************结束写代码******************************/


var res;

var _data = read_line();
// console.log(_data);
// console.log(JSON.parse(_data));

res = toUpperCase(JSON.parse(_data));
console.log(JSON.stringify(res));

//测试数据
// {"message":["anc",123,324,null,false],"person":{"name": null,"age": 22,"head": {"color": "bule","length": "short"},"eye": "green"},"mykey":[{"color": "bule","length": "short"},{"color": "bule","length": "short"}]}
