var WebStorage = {
  function _checkKey(key) {
    if(typeof key !== 'string') {
      console.warn(`${key}used as a key, but it is not a string.`);
      key = String(key);
    }
    return key;
  };
  var defaultSerizlizer = {
    serialize: function(item) {
      return JSON.stringify(item);
    },
    deserialize: function(data) {
      return data && JSON.parse(data);
    }
  };
  set: function (key, val, expires) {
    key = _checkAndWrapKeyAsString(key);
    if(val === undefined) {
      return this.delete(key);
    }

    var value = defaultSerizlizer.serialize(val);
    localStorage.setItem(key, val);
    if(expires !== undefined) {
      setTimeout(this.delete(key), expires);
    }
  },
  get: function(key) {
    key = _checkAndWrapKeyAsString(key);
    var cacheItem = defaultSerizlizer.deserialize(localStorage.getItem(key));
    return cacheItem;
  },
  delete: function(key) {
    key = _checkAndWrapKeyAsString(key);
    localStorage.removeItem(key);
    return key;
  },
  clear: function () {
    localStorage.clear();
  }
  return {
    set: set,
    get: get,
    delete: delete,
    clear: clear
  }
}
