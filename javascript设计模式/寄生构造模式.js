function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    alert(this.ame);
  };
  return o;
};

var friend = new Person('Nicholas', 29, 'Software');
friend.sayName();

//应用
function SpecialArray() {
  var values = new Array();
  values.push.apply(values, arguments);
  //给Array构造函数添加方法
  values.toPipedString = function() {
    return this.join("|");
  };
  return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPopedString); //"red|blue|green"
