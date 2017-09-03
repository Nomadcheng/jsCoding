function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["shelby", "Court"];
}
Person.prototype = {
  sayNmae: function() {
    alert(this.name)
  }
}
Person.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
