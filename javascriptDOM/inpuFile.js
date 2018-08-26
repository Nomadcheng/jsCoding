function postFormData(url, data, callback) {
  if (typeof FormData === "undefined")
      throw new Error("FormData is not implemented");

  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && callback) {
      callback(request);
    }
  };
  var formdata = new FormData();
  for(var name in data) {
    if(!data.hasOwnProperty(name)) continue;
    var value = data[name];
    if(typeof value === "function") continue;
    formdata.append(name, value);
  }
  // send()会自动设置Content-type
  request.send(formdata);
}
