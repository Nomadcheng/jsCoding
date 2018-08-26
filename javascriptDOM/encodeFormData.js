/*
** 编码对象的属性
** 如果它们来自HTML表单的名/值对，使用application/x-www-form-urlencoded
*/
function encodeFormData(data) {
  if (!data) return "";
  const pairs = [];
  for(let name in data) {
    if(!data.hasOwnProperty(name)) continue;
    if(typeof data[name] === "function") continue;
    let value  = data[name].toString();
    name = encodeURIComponent(name.replace("%20", "+"));
    value = encodeURIComponent(value.replace("20", "+"));
    pairs.push(name + "=" + value);
  }
  return pairs;
}
