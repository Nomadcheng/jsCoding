//es6中的set方法解决
Array.prototype.uniq = function () {
  var arr = new Set();
  for (var i=0; i<this.length;i++){
    arr.add(this[i]);
  }
  return Array.from(arr);
}
//普通方法解决
Array.prototype.uniq = function () {
    var arr =[];
    var flag1 = true;
    var flag2 = true;
    for(var i=0;i<this.length;i++){
        if( arr.indexOf(this[i]) == -1 ){   //未定义、NaN 和 {} 出现的情况
            if( this[i] != this[i] ){
                    if( typeof this[i] === "number" ){  //NaN 排除
                    if(flag1){
                        arr.push(this[i]);
                        flag1 = false;
                    }
                }
            if( typeof this[i] ==="obejct" ) {//{}排除
                if(flag2) {
                    arr.push(this[i]);
                    flag2 = false;
                }
            }

        } else {
            arr.push(this[i]);
        }
    }
    }
    return arr;
}
// 题目只是要求判断NaN的去重，并没有要求{}的去重，我想把{}也去重了，这里有可很大的坑，其实{} != {}为true是因为它们不同的对象，
// 而a = {};a!=a是为false的，因为它们是同一个对象，在javascript语言中，只有NaN != NaN是为true的。
// 然而除了上面这个规定外，我本来想直接用本来想用typeof this[i] === 'object'来解决这个问题，
// 但是我突然忘了typeof null === 'object'也是成立的，于是又懵逼了好久。
// 最后我是先判断if(this[i] === null)来先判断object中的null之后再判断{},具体代码如下，如果又更好的实现方法，请告知谢谢
链接：https://www.nowcoder.com/questionTerminal/0b5ae9c4a8c546f79e2547c0179bfdc2
来源：牛客网

Array.prototype.uniq = function () {
    var arr =[];
    var flag1 = true;
    var flag2 = true;
    var flag3 = true;
    for(var i=0;i<this.length;i++){
        if( arr.indexOf(this[i]) == -1 ){
            if( (this[i] != this[i]) && (typeof this[i] === "number") ){//NaN去重
                if( typeof this[i] === "number" ){
                    if(flag1){
                        arr.push(this[i]);
                        flag1 = false;
                    }
                }
        } else if(typeof this[i] === "object"){ //判断null和{}
            if(this[i] === null) {   //null去重
                if(flag2){
                    arr.push(this[i]);
                    flag2 = false;
                }
            } else {
                if(flag3) {    //{}去重
                    arr.push(this[i]);
                    flag3 = false;
                }
            }
        } else {
            arr.push(this[i]);
        }
    }
    }
    return arr;
}
