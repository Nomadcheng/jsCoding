/*
** 如果e有classList属性则返回它，否则，返回一个为e模拟DOMTokenList API的对象
** 返回的对象有一些常见的方法
** 来检测和修改e的类集合，如果classList属性是原生支持的
** 返回的类数组对象有length和数组索引属性。模拟DOMTokenList不是类数组对象
** 但是它有一个toArray()方法来返回一个含有元素类名的纯数组快照
*/
function classList(e) {
  if (e.classList) return e.classList;
  else return new CSSClassList(e);
}

// CSSClassList是一个模拟DOMTokenList的JavaScript类
function CSSClassList(e) { this.e = e; }

CSSClassList.prototype = {
  constructor: CSSClassList.prototype.constructor,
  constains: function(c) {
    if(c.length === 0 || c.indexOf(" ") !== -1) {
      throw new Error("Invalid class name: '" + c + "'");
    }
    // 首先是常规检查
    var classes = this.e.className;
    if(!classes) return false;  //e不含类名
    if(classes === c) return true; //e有一个完全匹配的类名

    // 否则，把c自身看做一个单词，利用正则表达式搜索c
    // \b在正则表达式里代表单词的边界
    return classes.search("\\b"+c+"\\b") != -1;
  },
  // 如果c不存在，将c添加到e.className
  add: function(c) {
    if (this.constains(c)) return;
    var classes = this.e.className;
    if(classes && classes[classes.length - 1] != " ") {
      c = " " + c;
    }
    this.e.className += c;
  },

  // 将在e.className中出现的所有c都删除
  remove: function(c) {
    // 检查c是否是合法的类名
    if (c.length === 0 || c.indexOf(" ") != -1){
      throw new Error("Invalid class name:");
    }
    // 将所有作为单词的c和多余的尾随空格全部删除
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
  },

  // 如果c不存在，将c添加到e.className中，并返回true
  // 否则，将在e.className中出现的所有c都删除，并返回false
  toggle: function(c) {
    if(this.constains(c)) {
      this.remove(c);
      return false;
    } else {
      this.add(c);
      return true;
    }
  },
  toString: function() {
    return this.e.className;
  },

  toArray: function() {
    return this.e.className.match(/\b\w+\b/g) || [];
  }

};
