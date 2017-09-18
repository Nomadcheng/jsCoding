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
