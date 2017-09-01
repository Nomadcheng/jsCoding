ult = [];
var index = -1;
var line1 = read_line();
while (line1) {
	  array1[i] = read_line();
	    i++;
		  line1 = line1 - 1
}

var line2 = read_line();
while (line2) {
	  array2[j] = read_line();
	    j++;
		  line2 = line2 - 1;
}

for(var k = 0; k < j; k++){
	  index = array1.indexOf(array2[k]);
	    if(index != -1){
			    array1.splice(index,1);
				  }
}
array1.sort();
for (var k = 0; k < array1.length; k++){
	  print(array1[k])
}
