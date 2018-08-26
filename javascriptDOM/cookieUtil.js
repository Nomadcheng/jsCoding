var cookieUtil = {
  var doc = window.document;
  /**
   * 根据opt中设置的值设置cookie
   *
   * @param {Object} opt 包含cookie信息的对象，选项如下
   *   key {string} 需要设置的名字
   *   value {string} 需要设置的值
   *   maxAge {number} 有效期
   *   domain {string} domain
   *   path {string} path
   *   secure {boolean} secure
   *
   * @return {string} opt对应的设置cookie的字符串
   */
   setCookie: function(opt) {
     var result = [];
     var str;

     if(opt.key) {
      //  encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
      result.push(encodeURIComponent(opt.key) + '=' +
          encodeURIComponent(opt.value));
      if('maxAge' in opt) {
        result.push('max-age=' + opt.maxAge);
      }
      if ('domain' in opt) {
          result.push('domain=' + opt.domain);
      }
      if ('path' in opt) {
          result.push('path=' + opt.path);
      }
      if (opt.secure) {
          result.push('secure');
      }

      str = result.join('; ');
      doc.cookie = str;

     }
     return str;
   },
   /**
   * 从cookie读取指定key的值，如果key有多个值，返回数组，如果没有
   * 对应key，返回undefined
   *
   * @param {string} key 需要从cookie获取值得key
   * @return {string|Array|undefined} 根据cookie数据返回不同值
   */
   getCookie: function(key) {
     key = encodeURIComponent(key);

     var result;
     var pairs = doc.cookie.split(';');
     var item,
         value;
     for(var i in pairs){
       item = pairs[i];
       if (item.indexOf(key) === 0) {
         value = decodeURIComponent(item.slice(item.slice(item.indexOf('=') + 1));
         if (typeof result === 'undefined') {
           result = value;
         } else if(typeof result == 'string'){
           result = [result];
           result.push(value);
         } else {
           result.push(value);
         }
       }
     }
       return result;
     },

        /**
         * 解析cookie返回对象，键值对为cookie存储信息
         *
         * @return {Object} 包含cookie信息的对象
         */
      getAllCookie: function() {
        var obj = {};
        var item, value,key;
        var pairs = doc.cookie.split(';');
        for(var i in pairs){
          item = pairs[i].split('=');
          key = decodeURIComponent(item[0]);
          value = decodeURIComponent(item[1] ? item[1] : '');
          obj[key] = value;
        }
        return obj;
      },

        /**
         * 清除当前文档能访问的所有cookie
         *
         */
      clearCookie: function() {
        var pairs = doc.cookie.split(';');
        var item,key;
        for(var i in pairs){
          item = pairs[i];
         key = item.slice(0, item.indexOf('='));
         doc.cookie = key + '=; max-age=0';
        }
      }
      return {
        setCookie: setCookie,
        getCookie: getCookie,
        getAllCookie: getAllCookie,
        clearCookie: clearCookie
      }
}

/*
 * cookieStorage.js
 * 本类实现像localStorage和sessionStorage一样的存储API，不同的是，基于HTTP cookie实现它
 */
function cookieStorage(maxage, path) { //两个参数分别代存储有效期和作用域
  // 获取一个存储全部cookie信息的对象
  var cookie = (function() {
    var cookie = {};
    var all = document.cookie;
    if(all === "") return cookie;
    var list = all.split(";");
    for (var i = 0; i < list.length; i++) {
      var cookie = list[i];
      var p = cookie.indexOf("="); //查找到第一个"="符号
      var name = cookie.substring(0, p);
      var value = cookie.substring(p + 1);
      value = decodeURIComponent(value);
      cookie[name] = value;
    }
    return cookie;
  }());

  // 将所有cookie的名字存储到一个数组中
  var keys = [];
  for(var key in cookie) keys.push(key)

  // 现在定义存储API公共的属性和方法
  // 存储cookie的个数
  this.length = keys.length;

  // 返回第n个cookie的名字，如果n越界则返回null
  this.key = function(n) {
    if(n < 0 || n >= keys.length) return null;
    return keys[n];
  };

  // 返回指定名字的cookie值，如果不存在则返回null
  this.getItem = function(name) {
    return cookie[name] || null;
  };

  // 存储cookie值
  this.setItem = function(key, value) {
    if(! (key in cookie)) {
      key.push(key);
      this.length++;
    }

    // 将名/值对数据存储到cookie对象中
    cookie[key] = value;

    // 开始正式设置cookie
    // 首先将要存储的cookie的值进行编码，同时创建一个“名值对”形式的字符串
    var cookie = key + "=" + encodeURIComponent(value);

    // 将cookie的属性也加入到该字符串中
    if(maxage) cookie += "; max-age=" + maxage;
    if(path) cookie += "; path=" + path;

    // 通过document.cookie属性来设置cookie
    document.cookie = cookie;
  }
  // 删除指定的cookie
  this.removeItem =function(key) {
    if(!(key in cookie)) return; // 如果cookie不存在，则什么也不做
    // 从内部维护的cookie组删除指定的cookie
    delete cookie[key];

    // 同时将cookie中的名字也在内部数组中删除
    keys.splice(keys.indexOf(key), 1);
    this.length--;

    // 最终通过将该cookie值设置为空字符串以及将有效期设置为0来删除指定的cookie
    document.cookie = key + "=; max-age=0";
  };
  // 删除所有cookie
  this.clear = function() {
    // 循环所有的cookie的名字，并将cookie删除
    for (var i = 0; i < keys.length; i++) {
      document.cookie = keys[i] + "=; max-age=0";
      // 重置所有的内部状态
      cookie = {};
      keys = [];
      this.length = 0;
    }
  }

}
