function cssStyle2DomStyle(sName) {
    var arr = sName.split('');
    //判断第一个是不是 '-'，是的话就删除
    if(arr.indexOf('-') == 0)
        arr.splice(0,1);
   //处理剩余的'-'
    for(var i=0; i<arr.length; i++){
        if(arr[i] == '-'){
            arr.splice(i,1);
            arr[i] = arr[i].toUpperCase();
        }
    }
    return arr.join('');
}
