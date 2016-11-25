var queryHistoryFrame = $("<iframe width=\"0\" height=\"0\" frameborder=\"0\" scrolling=\"0\"></iframe>");
(function(){
    var getNearby = function(latitude, longitude){
        $.ajax({
            type:"post",
            url:"/courier/searchapi.do",
            data:"method=courieraround&json={%22latitude%22:" + latitude + ",%22longitude%22:" + longitude + "}",
            dataType:"json",
            success: function(resultJson){
                if(resultJson.status == 200){
                    $("#nearbyList").empty();
                    for(var i in resultJson.coList){
                        $("#nearbyList").append("<li data-guid=\"" + resultJson.coList[i].guid + "\"><span style=\"background-image:url('//cdn.kuaidi100.com/images/all/36/" + resultJson.coList[i].companyCode + ".png')\">" + resultJson.coList[i].companyCode + "</span><span>" + resultJson.coList[i].courierName + "</span><span>" + resultJson.coList[i].companyName + "</span><span>收派范围：<em>" + resultJson.coList[i].workArea + "</em></span></li>");
                        if(i > 3) break;
                    }
                }
            }
        });
        $("#moreNearby a").attr("href", "https://m.kuaidi100.com/courier/?latitude=" + latitude + "&longitude=" + longitude);
    }
    queryHistoryFrame.appendTo('body');
    function getqueryHistory() {
        $.ajax({
            url: "//cache.kuaidi100.com/querycookie.jsp",
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success:function (json) {
                return true;
            }
        });
        return true;
    }
    var query = function(){
        if($("#queryInput").val() != ""){
            $("#queryForm").submit();
        }
    }

    var mscomnu = GetQueryString("mscomnu");
    if (!isNumberLetterFuhao(mscomnu)){
        mscomnu = "";
    }else{
        $("#queryInput").val(mscomnu);
        query();
    }

    if($("#comcode").val() != null && $("#comcode").val() != ""){
        var img = new Image();
        img.src="https://cdn.kuaidi100.com/images/all/56/" + $("#comcode").val() + ".png";
        img.onerror = function() {
            $("#comImg").attr("src", "//cdn.kuaidi100.com/images/all/" + $("#comcode").val() + "_logo.gif").css({"width": "auto", "border-radius": 0});
        };
        var netArray = [{"code":"debangwuliu","id":"1"},{"code":"yunda","id":"2"},{"code":"zhongtong","id":"3"},{"code":"yuantong","id":"4"},{"code":"shentong","id":"5"},{"code":"huitongkuaidi","id":"6"},{"code":"tiantian","id":"7"},{"code":"zhongtiewuliu","id":"8"},{"code":"ems","id":"9"},{"code":"shunfeng","id":"10"},{"code":"suer","id":"11"},{"code":"zhaijisong","id":"12"},{"code":"xinbangwuliu","id":"13"},{"code":"tiandihuayu","id":"14"},{"code":"jiajiwuliu","id":"15"},{"code":"xingchengjibian","id":"16"},{"code":"youshuwuliu","id":"17"},{"code":"kuaijiesudi","id":"18"},{"code":"ganzhongnengda","id":"19"},{"code":"guotongkuaidi","id":"20"},{"code":"gongsuda","id":"21"},{"code":"shenganwuliu","id":"22"},{"code":"quanfengkuaidi","id":"23"},{"code":"longbanwuliu","id":"24"},{"code":"quanritongkuaidi","id":"25"},{"code":"jiajikuaidi","id":"26"},{"code":"huiqiangkuaidi","id":"27"}];
        var netMap = netArray.map(function(net){
            if(net.code == $("#comcode").val()){
                $("#netLink").attr("href","https://m.kuaidi100.com/network/province_"+net.id+".htm");
            }
        });
    }else{
        window.kd.location.getLocation(function(result){
            if(result == -1){
                $("#nearbyList").hide();
                $("#moreNearby").hide();
                $("#nearbyTips").show();
            }else{
                $("#courierLink").attr("href", "https://m.kuaidi100.com/courier/?latitude=" + result.latitude + "&longitude=" + result.longitude);
            }
            window.kd.location.getXzq();
        });
    }
    /*启动图*/
    // var hasShowOpen = localStorage.getItem("hasShowOpen");
    // if(!hasShowOpen){
    // 	$("#open").attr("src", "/open/app_2015_1111.html").show();
    // }

    $(function(){
        $("#queryInput").keydown(function(e){
            var keycode = e.keyCode ? e.keyCode : e.which;
            if(keycode == 13){
                query();
            }
        }).keyup(function(){
            if($(this).val() == ""){
                $("#clearBtn").hide();
                $("#scanBtn").show();
            }else{
                $("#scanBtn").hide();
                $("#clearBtn").show();
            }
        }).focus(function(){
            if($(this).val() == ""){
                $("#clearBtn").hide();
                $("#scanBtn").show();
            }else{
                $("#scanBtn").hide();
                $("#clearBtn").show();
            }
        });
        $("#queryInput").click(function () {
            getqueryHistory()
        })
        $("#scanBtn").click(function(){
            window.kd.app.openapp("kuaidi100://ilovegirl/scan", "想用条码扫描吗？请安装快递100最新客户端。");
        });
        $("#clearBtn").on("click", function(){
            $("#queryInput").val("");
            $("#clearBtn").hide();
            $("#scanBtn").show();
            $("#queryInput").focus();
        });
        $("#queryBtn").on("click", query);
        $("#historyList").delegate("a", "click", function(){
            window.location.href = "result.jsp?com=" + $(this).attr("data-code") + "&nu=" + $(this).attr("data-nu");
        });
        $("#historyListCom").delegate("a", "click", function(){
            window.location.href = "https://m.kuaidi100.com/result.jsp?com=" + $(this).attr("data-code") + "&nu=" + $(this).attr("data-nu");
        });
        $("#clearHistory").on("click", function(){
            queryHistoryFrame.attr("src", "//cache.kuaidi100.com/index.html?option=empty");
            $("#history").hide();
        });
        $("#historyCloseBtn").on("click", function(){
            $("#history").hide();
        });
        $("#netLink").on("click", function(){
            var areaCode = localStorage.getItem("geo_city");
            if(areaCode != null && areaCode != ""){
                window.location.href = "https://m.kuaidi100.com/network/net_" + areaCode.substring(0, 4) + "_all_all_1.htm";
            }else{
                window.location.href = "https://m.kuaidi100.com/network/clist.jsp";
            }
        });
        $("#nearbyLink").on("click", function(){
            $("#nearby").toggle();
            if(!$("#nearbyList").find("li").length > 0){
                var latitude = localStorage.getItem("geo_latitude");
                var longitude = localStorage.getItem("geo_longitude");
                if(latitude != null && latitude != "" && longitude != null && longitude != ""){
                    getNearby(latitude, longitude);
                }
            }
        });
        $("#nearbyList").delegate("li", "click", function(){
            window.location.href = "https://m.kuaidi100.com/courier/detail_" + $(this).attr("data-guid") + ".html";
        });
    });

})()
/*历史单号*/
function  getHistory(querycookie){
    $("#historyList").empty();
    $("#historyListCom").empty();
    var history = querycookie;
    if(history.length > 0){
        //var comHistory=new Array();
        var input = $("#queryInput").val();
        for(var i in history){
            var code=history[i].code
            var classcode=$("#historyListCom").attr("class");
            var nu = history[i].nu;
            /*if(code==classcode){
             if(nu.indexOf(input) >= 0){
             window.kd.company.getsingleCom(history[i].code, function(comJson){
             if(nu.length>18){
             nu=nu.substring(0,18)+"...";
             }
             $("#historyListCom").append("<li><a data-code=\"" + comJson.number + "\" data-nu=\"" + nu + "\"><span>" + comJson.name + "</span>" + nu + "</a></li>");
             });
             }
             }*/
            if(nu.indexOf(input) >= 0){
                window.kd.company.getsingleCom(history[i].code, function(comJson){
                    if(nu.length>18){
                        nu=nu.substring(0,18)+"...";
                    }
                    $("#historyList").append("<li><a data-code=\"" + comJson.number + "\" data-nu=\"" + nu + "\"><span>" + comJson.name + "</span>" + nu + "</a></li>");
                });
            }
            if(nu.indexOf(input) >= 0){
                window.kd.company.getsingleCom(history[i].code, function(comJson){
                    if(nu.length>18){
                        nu=nu.substring(0,18)+"...";
                    }
                    $("#historyListCom").append("<li><a data-code=\"" + comJson.number + "\" data-nu=\"" + nu + "\"><span>" + comJson.name + "</span>" + nu + "</a></li>");
                });
            }
        }
    }
    if($("#historyList").html() != ""){
        $("#history").show();
    }else{
        $("#history").hide();
    }
    if($("#historyListCom").html() != ""){
        $("#history").show();
    }else{
        $("#history").hide();
    }
}

function jsoncallback(data) {
    querycookie = eval('(' + decodeURIComponent(data) + ')');
    getHistory(querycookie);
}

/*获取参数*/
function GetQueryString(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]);return null;
}

//判断是否是数字/字母/特殊字符
function isNumberLetterFuhao(str) {
    var regStr = "^[0-9a-zA-Z\@\#\$\-\]+$";
    var reg = new RegExp(regStr);
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}