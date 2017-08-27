//简单实现
function fibonacci(n){
    if(n==1||n==2)
        return 1;
    return fibonacci(n-1)+fibonacci(n-2);
}
//闭包储存中间结果，优化多次调用
var _fib = (function (n) {
    var memory = [0, 1];
    return function (n) {
        for (var i = memory.length; i <= n; i++) {
            memory[i] = memory[i - 1] + memory[i - 2];
        }
        return memory.slice(0,n+1);
    };
})();

var fibonacci = function (n) {
    return _fib(n)[n];
}
