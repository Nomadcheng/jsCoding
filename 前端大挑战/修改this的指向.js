//bing实现
function bindThis(f, oTarget) {
    return f.bind(oTarget);
}
//apply实现
function bindThis (func, context) {
    return function () {
        return func.apply(context, arguments)
    }
}
