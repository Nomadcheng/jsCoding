function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  //方法
  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function() {
      alert(this.name);
    };
  };
};
