var validate = function(parens) {
  var n = parens.length;
  var childs = [];
  for (var i = 0; i < n; i++) {
    if(parens[i] == '(' || parens[i] == '{' || parens[i] == '[' || parens[i] == '<'){
      childs.push(parens[i]);
    }else if(parens[i] == ')') {
      if(childs.length && childs[childs.length - 1] == '('){
        childs.pop();
      } else {
        return false;
        break;
      }
    } else if(parens[i] == '}') {
      if(childs.length && childs[childs.length - 1] == '{'){
        childs.pop();
      } else {
        return false;
        break;
      }
    } else if(parens[i] == ']') {
      if(childs.length && childs[childs.length - 1] == '['){
        childs.pop();
      } else {
        return false;
        break;
      }
    } else {
      if(childs.length && childs[childs.length - 1] == '<'){
        childs.pop();
      } else {
        return false;
        break;
      }
    }
  }
  return !childs.length;
}
