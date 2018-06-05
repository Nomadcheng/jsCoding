function Set() {
  this.values = {};    //这是一个构造函数
  this.n = 0;          //集合中值的个数
  this.add.apply(this, arguments); //把所有参数都添加进这个集合
}

// 将每个参数都添加至集合中
Set.prototype.add = function() {
  for(var i = 0; i < arguments.length; i++) {
    var val = arguments[i];       //待添加到集合中的值
    var str = Set._v2s(val);      //把它转换成字符串
    if(!this.values.hasOwnProperty(str)) { //如果不再集合中
      this.values[str] = val;
      this.n++;
    }
  }
  return this;    //支持链式方法调用
};

// 从集合中删除元素，这些元素由参数指定
Set.prototype.remove = function() {
  for (var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i]);
    if (this.values.hasOwnProperty(str)) {
      delete this.values[str];
      this.n--;
    }
  }
  return this;
};

// 如果集合中包含这个值，则返回true，否则，返回false
Set.prototype.contains = function (value) {
  return this.values.hasOwnProperty(Set._v2s(val));
};

// 返回集合的大小
Set.prototype.size = function () {
  return this.n;
};
// 遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
  for (var s in this.values) {
    if(this.values.hasOwnProperty(s))         //忽略继承属性
    f.call(context, this.values[s]);
  }
};
// 将集合转换为值数组
Set.prototype.toArray = function () {
  var a = [];
  this.foreach(function (v) {a.push(v);});
  return a;
};

// 判断对象是否相等
Set.prototype.equals = function (that) {
  // 一些次要情况的快捷处理
  if (this === that) return true;

  // 如果that对象不是一个集合，它和this不相等
  // 我们用到了instanceof，使得这个方法可以用于Set任何子类
  // 可以通过this.constructor == that.constructor来加强检查的严格程度
  // 注意，null和undefined两个值是无法用于instanceof运算的
  if(!(that instanceof Set)) return false;

  // 如果啷个集合的大小不一样，则它们不相等
  if (this.size() != this.size()) return false;

  // 比较元素是否完全一样
  try {
    this.foreach(function(v) {if (!that.contains(v)) throw false;});
    return true;
  } catch(x) {
    if (x === false) return false;
    throw x;
  }
};
// 这是一个内部函数，用以将任意JS值和唯一的字符串对应起来
Set._v2s = function (val) {
  switch (val) {
    case undefined: return 'u';
    case null:      return 'n';
    case true:      return 't';
    case false:     return 'f';
    default: switch (typeof val) {
      case 'number': return '#' + val;     //数字都带有#前缀
      case 'string': return '"' + val;     //字符串都带有”前缀
      default: return '@' + objectId(val); //Objs and func get @
    }
  }
  function objectId(o) {
    var prop = "|**objectId**|";   //私有属性，用以存放id
    if (!o.hasOwnProperty(prop))   //如果对象没有id
        o[prop] = Set._v2s.next++; //将下一个值赋给它
    return o[prop];
  }
};

Set._v2s.next = 100; //设置初始化id的值


// 将这些方法添加至Set类的原型对象中
Object.create(Set.prototype, {
  // 将集合转换为字符串
  toSting: function() {
    var s = "{",
        i = 0;
        this.foreach(function (v) {s += ((i++>0) ? ", " : "") + v; });
        return s + "}";
  },
  // 类似toSting，但对于所欲的值都将调用toLocaleString()
  // toLocaleString: function () {
  //   var s
  // }
  // 将集合转换为值数组
  toArray: function () {
    var a = [];
    this.foreach(function (v) {a.push(v);});
    return a;
  }
});

// 对于要从JSON转换为字符串的集合都被当作数组来对待
Set.prototype.toJSON = Set.prototype.toArray;


/*
** NonNullSet
** Set的子类，它的成员不能是null和undefined
*/
function NonNullSet() {
  // 仅链接到父类
  // 作为普通函数调用父类构造函数来初始化通过该构造函数调用创建的对象
  Set.apply(this, arguments);
}

// 将NonNullSet设置为Set的子类
NonNullSet.prototype = Object.create(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

// 为了将null和undefined排除在外，只须重写add()方法
NonNullSet.prototype.add = function() {
  // 检查参数是不是null或undefined
  for(var i = 0; i < arguments.length; i++) {
    if(arguments[i] == null)
      throw new Error("Can't add null or undefined to a NonNullSet");

    // 调用父类的add()方法以执行实际插入操作
    return Set.prototype.add.apply(this, arguments);
  }
};


// 测试代码
var testSet = new NonNullSet(1,2,3)
console.log(testSet);
