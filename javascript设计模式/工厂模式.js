function createPerson (name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayNmae = function (){
  alert (this.name);
};
return o;
};

var person1 = createPerson('Nicholas', 23, Software Engerneer);
var person2 = createPerson('Nicholas', 23, Software Engerneer);
