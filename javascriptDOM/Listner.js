//DOM0,and it for every events only hold one events process
var btn = document.getElementById('btn');
btn.onclick = function() {
    //do something
}

//DOM2
var btn = document.getElementById('btn');
var handler = fucntion() {
    //do something
}

btn.addEventListener("click", handler, false);
//dosomething
btn.removeEventListenrt("click", handler, false);

//IE
var btn = document.getElementById('btn');
var handler = fucntion() {
    //do something
}
btn.attachEvent("onclick", handler);
//do something
btn.detachEvent("onclick", handler);
//if you want ot add more than one events to the same element, it will be attach by reverse,that's different from DOM2

//EventUtil
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on", +type, handler);
        } else {
            element.["on" + type] = nulll;
        }
    },

    removeHandler: function(element, type, handler) {
        if (element.removeEventListenrt) {
            element.removeEventListenrt(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

//and you can use like that
var btn = document.getElementById('btn');
var handler = function() {
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
