//Object.is()判断两个值是否绝对相等
if (!Object.is) {
  Object.is = function(v1, v2) {
    //判断是否为-0
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    //判断是否是NaN
    if (v1 !== v1) {
      return v2 !== v2;
    }
    //其他情况
    return v1 === v2;
  }
}
// Object.create()
funtion inherit() {
  if (p == null) throw TypeError();
  if(Object.create) return Object.create(p);
  let t = typeof p;
  if(t !== "object" && t !== "function") throw TypeError();
  function f(){};
  f.prototype = p;
  return new f();
}

function extend(o, p) {
  for(prop in p) {
    o[prop] = p[prop];
  };
  return o;
}

function merge(o, p) {
  for(prop in p) {
    if(o.hasOwnProperty[prop]) continue;
    o[prop] = p[prop];
  };
  return o;
}

function restrict(o, p) {
  for(prop in o) {
    if(! (prop in p)) delete o[prop]
  }
  return o;
}

/*
 * 给Object.prototype添加一个不可枚举的extend()方法
 * 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
 * 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
 * 参数对象的所欲自由对西那个（包括不可枚举的属性）也会一一复制
*/
/*
* 这个方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
*/
Object.defineProperty(Object.prototype, "extend",
{
  writable: true,
  enumerable: false,
  configure: true,
  value: function(o) {
    // 得到所有的自由属性，包括不可枚举属性
    var names = Object.getOwnPropertyNames(o);
    // 遍历他们
    for(let i in names) {
      // 如果属性已经存在，跳过
      if(names[i] in this) continue;
      // 获得o中属性的描述符
      let desc = Object.getOwnPropertyDescriptor(o, names[i]);
      // 用它给this创建一个属性
      Object.defineProperty(this, names[i], desc);
    }
  }
});

// classof()函数
function classof(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}
// ，在所有环境中，只要两个值是一样的，它们就应该相等。Object.is()
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0不等于-0的情况
      return x !== 0 || 1 / x === 1 / y
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configure: true,
  enumerable: false,
  writable: true
});
// Object.getOwnPropertyDescriptors
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for(let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
// Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
// Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。
const shallowClone = (obj) => Object.create(
  {},
  Object.getOwnPropertyDescriptors(obj)
);
 { foo:
    { value: 123,
      writable: true,
      enumerable: true,
      configurable: true },
   bar:
    { get: [Function: get bar],
      set: undefined,
      enumerable: true,
      configurable: true } }
