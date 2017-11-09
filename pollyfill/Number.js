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
// NUmber.isNaN()
if(!Number.isNaN) {
  Number.isNaN = function(n) {
    return (
      typeof n === "number" && window.isNaN( n )
    );
  };
}

if(!Number.isNaN) {
  Number.isNaN = function(n) {
    return n !== n;
  };
}
//isNegZero()
function isNegZero(n) {
  n = Number(n);
  return (n === 0) && (1 / n === -Infinity);
}
