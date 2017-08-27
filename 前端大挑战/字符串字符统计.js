function count(str) {
    var o = {};
    for(var i = 0; i < str.length; i++){
        if(!!str[i]) {
            if(str[i] in o) {
                o[str[i]]++;
            } else {
                o[str[i]] = 1;
            }
        }
    }
    return o;
}
