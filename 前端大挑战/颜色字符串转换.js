// 题目描述
// 将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
// 1. rgb 中每个 , 后面的空格数量不固定
// 2. 十六进制表达式使用六位小写字母
// 3. 如果输入不符合 rgb 格式，返回原始输入
function rgb2hex(sRGB) {
    var strFormat=function (str,num) {
        str=(+str).toString(16);
        str=str.length<2?str+str:str;
        return str;
    };
    sRGB=sRGB.replace(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/g,function (str,s1,s2,s3) {
        return "#"+strFormat(s1,16)+strFormat(s2,16)+strFormat(s3,16);
    });
    return sRGB;
}
