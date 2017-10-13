function panelArr(arr) {
  var newArr = [];
  var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  var dealArr = function(arr) {
    for (let i = 0; i < arr.length; i++) {
      isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);
    }
  };
  dealArr(arr);
  return newArr;
};
console.log(panelArr([1,[2,3]]));//[1,2,3]
