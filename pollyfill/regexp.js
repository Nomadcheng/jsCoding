// 匹配一个url
var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var strictUrl = /^(http|https|www):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var strictText = "http://www.example.com/~david"

var result = strictText.match(strictUrl);
if(result != null) {
  var fullurl = result[0];
  var protocol = result[1];
  var host = result[2];
  var path = result[3];
}
console.log(result);
