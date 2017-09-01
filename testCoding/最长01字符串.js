tr1 = [];
var str2 = [];
var sum1 = 1;
var sum2 = 1;

console.log('Input Sample 1');
var line1 = read_line();
for (var k = 0; k < line1; k++) {
	  str1[k] = read_line();
}

console.log('Input Sample 2');
var line2 = read_line();
for (var k = 0; k < line2; k++){
	  str2[k] = read_line()
}


for(var k =1; k < str1.length; k++) {
	  if(str1[k-1] != str1[k]) {
		      sum1++;
			    }
}
for(var k = 1; k < str2.length; k++) {
	  if(str2[k-1] != str2[k]) {
		      sum2++;
			    }
}
console.log(sum1);
console.log(sum2);
