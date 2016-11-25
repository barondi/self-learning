// get cookie
function getcookie(cookieName) {
    var cookieValue = "";
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
            if (cookie.substring(0, cookieName.length + 1) == (cookieName + '=')) {
                cookieValue = unescape(cookie.substring(cookieName.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//lang cookies
function setcookie(cookieName, cookieValue) {
    var expires = new Date();
    var now = parseInt(expires.getTime());
    var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
    expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; path=/";
}
function setcookie_kuaidi100(cookieName, cookieValue) {
    var expires = new Date();
    var now = parseInt(expires.getTime());
    var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
    expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + "; domain=.kuaidi100.com;path=/";
}
//temp cookies
function setcookie_temp(cookieName, cookieValue) {
    document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";path=/";
}

// delete cookie
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    document.cookie = escape(name) + "=" + escape(cval) + "; expires=" + exp.toGMTString() + "; path=/";
}
function deleteCookie_kuaidi100(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    document.cookie = escape(name) + "=" + escape(cval) + "; expires=" + exp.toGMTString() + "; domain=.kuaidi100.com;path=/";
}
//get url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}