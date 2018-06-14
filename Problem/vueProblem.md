在vue中data更新后，重新获取数据时，如果先将数据清空再一条条赋值会造成页面全部数据重新渲染，这样会出现卡顿
所以将全部数据赋值给data，这样vue会自动检测数据中不同的部分，然后只将新的数据渲染出来，旧的数据不变

至于为什么？有待了解vue这个框架

当在一个组件中引用同一个组件的时候，如果这个子组件中使用了querySelector等通过tagName或者css class取document时，要注意，
这时候所有组件取到的都是第一个渲染的组件的内容，如果要在子组件中设置不同的css，最后通过style绑定一个styleObject，然后将prop获取到的值
动态加载到styleObject中

### 用key管理可复用的元素
Vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使Vue变得非常快之外，还有其他一些好处。例如，如果你允许用户在不同的登陆方式之间切换
```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>`不会被替换掉——仅仅是替换了它的 placeholder。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可：
```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
注意，<label> 元素仍然会被高效地复用，因为它们没有添加 key 属性。

### 数组更新检测
#### 变异方法
Vue包含一组观察数组的变异方法，所以它们也会将触发视图更新，这些方法如下：
* push
* pop
* shift
* unshift
* splice
* sort
* reverse
* forEach

#### 替换数组
变异方法，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异方法。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以使用新数组替换旧数组
* filter
* concat
* slice
* map
```
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
你可能认为这将导致Vue丢弃现有DOM并重新渲染整个列表。但事实并非如此。Vue为了使得DOM元素得到最大范围的重用而实现了一些智能的、启发式的方法，**所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作**

#### 注意事项
由于Javascript的限制，Vue不能检测以下变动的数组：
1. 当你利用索引直接设置一个选项时，例如`vm.items[indexOfItem]` = newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```
为了解决第一类问题，以下两个方式都可以实现和`vm.items[indexOfItem] = newValue`相同的效果，同时也将触发状态更新：
```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
// 或者使用vm.$set实例方法，该方法是全局方法Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue);
```
为了解决第二类问题，你可以使用splice
`vm.items.splice(newLength)`

### 对象更改检测注意事项
还是由于JavaScript的限制，** Vue不能检测对象属性的添加或删除 **
```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```
对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，
```
Vue.set(vm.userProfile, 'age', 27)
```
有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
#### v-for on a <template>
类似于 v-if，你也可以利用带有 v-for 的 <template> 渲染多个元素。比如：
```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```
#### v-for with v-if
当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你想为仅有的一些项渲染节点时，这种优先级的机制会十分有用，如下：
```
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
上面的代码只传递了未完成的 todos。

### 异步更新队列
可能你还没有注意到，Vue异步执行DOM更新。只要观察到数据变化，Vue将开启一个队列，并缓存在同一事件循环中发生的所有数据改变。**如果同一个watcher被多次触发，将只会被推入到队列中一次**。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后，在打一个事件循环“tick”中，Vue刷新队列并执行实际（已经去重）工作。Vue在内部尝试对异步队列使用原生的Promise.then和MessageChannel，如果执行环境不支持，会采用setTimeout替代

当你设置 vm.someData = 'new value' ，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。例如：
