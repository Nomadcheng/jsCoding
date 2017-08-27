// 题目描述：
// 获取 url 中的参数
// 1. 指定参数名称，返回该参数的值 或者 空字符串
// 2. 不指定参数名称，返回全部的参数对象 或者 {}
// 3. 如果存在多个同名参数，则返回数组
function getUrlParam(sUrl, sKey) {
    var list = sUrl.toString().split("?")[1].split("#")[0];
    if (!!sKey) {
        if(!!list){
            var strs = list.split("&");
            var args = [];
            for (var i = 0; i < strs.length; i++) {
                var item = strs[i].split("=");
                if (item[0] === sKey) {
                    args.push(item[1]);
                }
            }
            if (args.length === 1) {
                return args[0];
            } else {
               return args;
            }
        } else {
            return '';
        }
    } else if(!!list){
        var strs = list.split("&");
        var o = {};
        for (var i = 0; i < strs.length; i++) {
            var itemp = strs[i].split("=");
                if (!(itemp[0] in o)) {
                    o[itemp[0]] = [];
                }
                o[itemp[0]].push(itemp[1]);
        }
        return o;
    }else {
        return {};
    }
}
