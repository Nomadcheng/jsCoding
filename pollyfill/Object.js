//Object.is()判断两个值是否绝对相等
if (!Object.is) {
  Object.is = function(v1, v2) {
    //判断是否为-0
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    //判断是否是NaN
    if (v1 !== v1) {
      return v2 !== v2;
    }
    //其他情况
    return v1 === v2;
  }
}