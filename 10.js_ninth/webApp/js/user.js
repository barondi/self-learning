var logoutDone = 0;
var loginTOKEN = getcookie("TOKEN");
var accountInfo = ""
// 自动登录
isAutoLogin();
function isAutoLogin() {
    var loginSession = getcookie("loginSession");
    if (loginTOKEN && loginSession == "1") { //已登录
        setWelcomeLogin();
        if ($.isFunction(window.init)) {
            init();
        }
    } else if (loginTOKEN) {
        login();
    } else {
        deleteCookie("loginSession");
        deleteCookie("loginId");
        deleteCookie("loginType");
        deleteCookie("loginName");
        deleteCookie("loginEmail");
        deleteCookie("loginMobile");
        deleteCookie("KDSSO");
        deleteCookie("KDWWW");
        deleteCookie("TOKEN");
        if (window.location.href.indexOf("buyer.kuaidi100.com") != -1 || window.location.href.indexOf("seller.kuaidi100.com") != -1 || window.location.href.indexOf("sso.kuaidi100.com") != -1) {
            window.location.href = "https://sso.kuaidi100.com";
        } else {
            setWelcomeLogout();
        }
    }
}

// 登录操作
function login() {
    if (loginTOKEN) {
        $.ajax({
            type: "post",
            url: "/user/userapi.do",
            data: "method=getuserinfo",
            success: function (resultJson) {
                if (resultJson.status == "200") { //登录成功
                    accountInfo = resultJson;
                    setcookie_kuaidi100("loginId", resultJson.user.id);
                    setcookie_kuaidi100("loginType", resultJson.user.userType);
                    setcookie_kuaidi100("loginName", resultJson.user.name);
                    setcookie_kuaidi100("loginEmail", resultJson.user.email);
                    setcookie_kuaidi100("loginMobile", resultJson.user.mobile);
                    setcookie_temp("loginSession", "1");
                    setWelcomeLogin();
                    if ($.isFunction(window.init)) {
                        init();
                    }
                } else { //登录失败
                    deleteCookie("loginEmail");
                    deleteCookie("loginId");
                    deleteCookie("loginMobile");
                    deleteCookie("loginName");
                    deleteCookie("loginSession");
                    deleteCookie("loginType");
                    deleteCookie("KDWWW");
                    deleteCookie("KDSSO");
                    if (window.location.href.indexOf("buyer.kuaidi100.com") != -1 || window.location.href.indexOf("seller.kuaidi100.com") != -1 || window.location.href.indexOf("sso.kuaidi100.com") != -1) {
                        window.location.href = "https://www.kuaidi100.com/";
                    } else {
                        setWelcomeLogout();
                    }
                }
            }
        });
    } else { //无帐号显示登录
        setWelcomeLogout();
    }
}

// 退出 
function logout() {
    if (loginTOKEN) {
        var logoutUrl = "/user/logout.do";
        try {
            $.post(logoutUrl, {
                method: "logout"
            }, function (resultJson) {
                if (resultJson.status == "200" || resultJson.status == "403") { //注销成功(或未登录)，注销时把记住我账号销毁
                    deleteCookie("loginEmail");
                    deleteCookie("loginId");
                    deleteCookie("loginMobile");
                    deleteCookie("loginName");
                    deleteCookie("loginSession");
                    deleteCookie_kuaidi100("loginType");
                    deleteCookie("KDWWW");
                    logoutDone = 0;
                    doPost("https://sso.kuaidi100.com/user/logout.do?method=logout&temp=" + Math.random());
                    doPost("https://www.kuaidi100.com/user/logout.do?method=logout&temp=" + Math.random());
                    if (window.location.href.indexOf("buyer.kuaidi100.com") != -1 || window.location.href.indexOf("seller.kuaidi100.com") != -1 || window.location.href.indexOf("sso.kuaidi100.com") != -1) {
                        window.location.href = "https://www.kuaidi100.com/";
                    } else {
                        setWelcomeLogout();
                    }
                }
            });
        } catch (e) {
            window.location.replace(location.href);
        }
    }
}
//set login
function setWelcomeLogin() {
    var loginType = getcookie("loginType");
    var userType;
    if (loginType == "SELLER") {
        userType = "mai";
    } else if (loginType == "ENT") {
        userType = "seller";
    } else if (loginType == "BUYER") {
        userType = "buyer";
    } else if (loginType == "JDSELLER") {
        userType = "jd";
    } else if (loginType == "SNT") {
        userType = "b";
    } else if (loginType == "MKT") {
        userType = "c";
    } else if (loginType == "POLL") {
        userType = "poll";
    }
    if (window.location.href.indexOf("seller.kuaidi100.com") != -1) {
        if (userType == "buyer" || userType == "mai" || userType == "jd") {
            window.location.href = "https://sso.kuaidi100.com/user/setting.jsp"
        }
    }
    if (window.location.href.indexOf("buyer.kuaidi100.com") != -1) {
        if (userType == "seller" || userType == "mai" || userType == "jd") {
            window.location.href = "https://sso.kuaidi100.com/user/setting.jsp"
        }
    }
    if (window.location.href.indexOf("mai.kuaidi100.com") != -1) {
        if (userType == "seller" || userType == "buyer" || userType == "jd") {
            window.location.href = "https://sso.kuaidi100.com/user/setting.jsp"
        }
    }
    if (window.location.href.indexOf("jd.kuaidi100.com") != -1) {
        if (userType == "seller" || userType == "buyer" || userType == "mai") {
            window.location.href = "https://sso.kuaidi100.com/user/setting.jsp"
        }
    }
    //我的查询记录用户身份判断
    $("#userUrl").html("");
    if (userType == "b") {
        $("#userUrl").append("<a href='http://" + userType + ".kuaidi100.com/' target='_blank'>进入快递管家</a>")
    }else if(userType == "c") {
        $("#menu-snt").attr("href","http://c.kuaidi100.com/").html("快递超市");
        $("#userUrl").append("<a href='http://" + userType + ".kuaidi100.com/'target='_blank'>进入快递超市</a>")
    }else if (userType == "poll") {
        $("#userUrl").append("<a href='http://" + userType + ".kuaidi100.com/'target='_blank'>推送服务</a>")
    }else if(userType == "mai"||userType == "jd"){
        $("#userUrl").append("<a href='//" + userType + ".kuaidi100.com/history.shtml'target='_blank'>我的快递单</a>")
    }else if(userType == "buyer"||userType == "seller"){
        $("#userUrl").append("<a href='//" + userType + ".kuaidi100.com/'target='_blank'>查询记录</a>")
    }
    //用户名显示
    var userName = "";
    userName = $.trim(getcookie("loginName"));
    if (userName == "" || userName == null) {
        userName = $.trim(getcookie("loginMobile"));
        if (userName == "null" || userName == "") {
            userName = getcookie("loginEmail");
        }
    }
    if (userName.length > 11) {
        userName = userName.substring(0, 10) + "...";
    }
    $("#userImg").attr('src', 'https://p.kuaidi100.com/mobile/mobileapi.do?method=download&id=avatar_' + getcookie('loginId') + '.jpg');
    $(".buyer-avatar").html("<img src=\"https://p.kuaidi100.com/mobile/mobileapi.do?method=download&id=avatar_" + getcookie("loginId") + ".jpg\">");
    $("#userName").html(userName);
    $("#welcome").hide();
    $("#userInfo").show();
}

//set logout
function setWelcomeLogout() {
    $("#welcome").show();
    $("#userInfo").hide();
}

// iframe post
function doPost(url) {
    var frame = $("<iframe width=\"0\" height=\"0\" frameborder=\"0\" scrolling=\"0\"></iframe>");
    frame.appendTo('body');
    frame.attr("src", url);
    frame.load(logoutFinish);
}

// 刷新页面
function logoutFinish() {
    logoutDone++;
    if (logoutDone >= 2) {
        window.location.reload();
    }
}