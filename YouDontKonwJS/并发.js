// 非交互，如果进程间没有相互影响的话，不确定性是完全可以接收的
var res = {};
function foo(results) {
  res.foo = results;
}

function bar(results) {
  res.bar = results;
}

ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );

// 交互，更常见的情况是，并发的“进程”需要相互交流，通过作用域或 DOM 间接交互。正如前 面介绍的，
// 如果出现这样的交互，就需要对它们的交互进行协调以避免竞态的出现。
// 可以协调交互顺序来处理这样的竞态条件:
var res = [];
function response(data) {
  if (data.url == "http://") {
    res[0] = data;
  } else if (data.url == "https://"){
    res[1] = data;
  }
}

ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

// 包裹 baz() 调用的条件判断 if (a && b) 传统上称为门(gate)，我们虽然不能确定 a 和 b 到达
// 的顺序，但是会等到它们两个都准备好再进一步打开门(调用 baz())。
var a;
function foo(x) {
  if (!a) {
    a = x * 2;
    baz();
  }
}

function bar(x) {
  if (!a) {
    a = x / 2;
    baz();
  }
}

function baz() {
  console.log( a );
}

ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );


// 条件判断 if (!a) 使得只有 foo() 和 bar() 中的第一个可以通过，第二个(实际上是任何 后续的)
// 调用会被忽略。也就是说，第二名没有任何意义!

// 协作
//
// 还有一种并发合作方式，称为并发协作(cooperative concurrency)。这里的重点不再是通过 共享作用
// 域中的值进行交互(尽管显然这也是允许的!)。这里的目标是取到一个长期运 行的“进程”，并将其分割成多
// 个步骤或多批任务，使得其他并发“进程”有机会将自己 的运算插入到事件循环队列中交替运行。

var res = [];

// response从Ajax调用中取得结果数组
function response(data) {
  // 一次处理1000个
  var chunk = data.splice(0, 1000);

  // 添加到已有的res组
  res = res.concat(
    // 创建一个新的数组把chunk中所有值加倍
    chunk.map( function(val) {
      return val * 2;
    });
  );

  // 还有剩下的需要处理吗？
  if (data.lengtj > 0) {
    // 异步调度下一次批处理
    setTimeout( function() {
      response( data );
    }, 0);
  }
};

ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );

// 我们把数据集合放在最多包含 1000 条项目的块中。这样，我们就确保了“进程”运行时 间会很短，即使
// 这意味着需要更多的后续“进程”，因为事件循环队列的交替运行会提高 站点 /App 的响应(性能)。
