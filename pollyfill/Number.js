// Number.isInteger()
if(!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num == "number" && num % 1 == 0;
  };
}
// Number.isSafeInteger()
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function(num) {
    return Number.isInteger( num ) && Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
  };
}
