浏览器获取了这个对象是用引用赋值然后点开是获取了最新的值
数组中push的对象也是应用，也会受影响
```
function test() {
  const form = {a: '123'};
  const test = [];
  test.push(form);
  console.log(this.form);
  console.log(this.test);
  form.a = '';
}
// {a: ''}
// [{a: ''}]
```
