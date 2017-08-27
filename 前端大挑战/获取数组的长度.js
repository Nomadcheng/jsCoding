// 这里主要用到charCodeAt的方法:
// 如下例子
//var a = "客"
//> a.charCodeAt(0)
//23458
//> String.fromCharCode(23458)
function strLength(s, bUnicode255For1) {
    var sum = 0;
    if(bUnicode255For1) {
        return s.length;
    } else {
        for(var i = 0; i < s.length; i++){
            if(s.charCodeAt(i) > 255) {
                sum = sum + 2;
            } else {
                sum++;
            }
        }
        return sum;
    }
}
