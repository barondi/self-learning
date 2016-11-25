window.kd = {};
(function() {
    window.kd.company = {
        getCompany: function(com, callback) {
            localStorage.removeItem("com_");
            var comJson = localStorage.getItem("com_" + com);
            if (comJson == null || comJson == "") {
                $.ajax({
                    type:"post",
                    url:"/company.do",
                    data:"method=all",
                    dataType:"json",
                    success:function (jsoncom) {
                        for (var i in jsoncom) {
                            if (jsoncom[i].number== com) {
                                console.log(JSON.stringify(jsoncom[i]));
                                localStorage.setItem("com_" + com, JSON.stringify(jsoncom[i]));
                                if (callback != null) {
                                    callback(jsoncom[i])
                                }
                                break
                            }
                        }
                    },
                })
            } else {
                if (callback != null) {
                    callback(JSON.parse(comJson))
                }
            }
        },
        getsingleCom: function(com, callback) {
            localStorage.removeItem("com_");
            var comJson = localStorage.getItem("com_" + com);
            if (comJson == null || comJson == "") {
                $.ajax({
                    type:"post",
                    url:"/company.do",
                    data:"method=companyjs&number="+com,
                    dataType:"json",
                    success:function (jsoncom) {
                        localStorage.setItem("com_" + com, JSON.stringify(jsoncom));
                        if (callback != null) {
                            callback(jsoncom)
                        }
                    },
                })
            } else {
                if (callback != null) {
                    callback(JSON.parse(comJson))
                }
            }
        }
    }
    window.kd.location = {
        isGettingLocation: false,
        getXzq: function(callback) {
            var that = this;
            var areaCode = localStorage.getItem("geo_city");
            var timestamp = localStorage.getItem("geo_timestamp");
            if (areaCode == null || areaCode == "" || timestamp == null || (new Date().getTime() - timestamp > 600000)) {
                var latitude = localStorage.getItem("geo_latitude");
                var longitude = localStorage.getItem("geo_longitude");
                if (latitude != null && latitude != "" && longitude != null && longitude != "") {
                    $.ajax({
                        type: "POST",
                        url: "/courier/searchapi.do",
                        data: "method=searchxzq&ip=myip&level=2&latitude=" + latitude + "&longitude=" + longitude,
                        dataType: "json",
                        success: function(resultJson) {
                            if (resultJson.status == 200) {
                                that.saveXzq(resultJson.xzq);
                                if (callback != null) {
                                    callback(resultJson.xzq)
                                }
                            }
                        }
                    })
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/sysapi.do?method=findxzqbyip",
                        dataType: "json",
                        success: function(resultJson) {
                            if (resultJson != null) {
                                that.saveXzq(resultJson);
                                if (callback != null) {
                                    callback(resultJson)
                                }
                            }
                        }
                    })
                }
            } else {
                if (callback != null) {
                    callback(-1)
                }
            }
        },
        saveXzq: function(xzq) {
            localStorage.setItem("geo_city", xzq.number.substring(0, 6));
            if ("11|12|31|50".indexOf(xzq.number.substring(0, 2)) != -1) {
                localStorage.setItem("geo_cityname", xzq.fullName.split(",")[0])
            } else {
                var cityName = xzq.fullName.split(",")[1];
                if (cityName == null) cityName = xzq.fullName.split(",")[0];
                localStorage.setItem("geo_cityname", cityName)
            }
            localStorage.setItem("geo_fullname", xzq.fullName);
            localStorage.setItem("geo_timestamp", new Date().getTime())
        },
        getLocation: function(callback) {
            var that = this;
            var t;
            if (!this.isGettingLocation) {
                this.isGettingLocation = true;
                t = setTimeout(function() {
                    that.isGettingLocation = false;
                    if (callback != null) {
                        callback(-1)
                    }
                }, 8000);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        clearTimeout(t);
                        if (that.isGettingLocation) {
                            that.isGettingLocation = false;
                            localStorage.setItem("geo_latitude", position.coords.latitude);
                            localStorage.setItem("geo_longitude", position.coords.longitude);
                            if (callback != null) {
                                callback(position.coords)
                            }
                        }
                    }, function() {
                        clearTimeout(t);
                        if (that.isGettingLocation) {
                            that.isGettingLocation = false;
                            if (callback != null) {
                                callback(-1)
                            }
                        }
                    })
                } else {
                    clearTimeout(t);
                    that.isGettingLocation = false;
                    if (callback != null) {
                        callback(-1)
                    }
                }
            }
        },
        getCountry: function(area, callback) {
            $.ajax({
                type: "POST",
                url: "/sysapi.do?method=getcounty&city=" + area,
                dataType: "json",
                success: function(resultJson) {
                    if (resultJson != null && resultJson.length > 0) {
                        if (callback != null) {
                            callback(resultJson)
                        }
                    }
                }
            })
        }
    };
    window.kd.app = {
        openapp: function(src, tips) {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf("micromessenger") != -1) {
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.Kingdee.Express"
            } else if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1) {
                window.location.href = src;
                var clickedAt = +new Date;
                setTimeout(function(){
                    !window.document.webkitHidden && setTimeout(function(){
                        if (+new Date - clickedAt < 2000){
                            $("#loadingWait").hide();
                            window.location = 'http://itunes.apple.com/app/id458270120?ls=1&mt=8';
                        }
                    }, 400);
                }, 500)
            }else if (userAgent.indexOf("android") != -1) {
                window.location.href = src;
                var clickedAt = +new Date;
                setTimeout(function(){
                    !window.document.webkitHidden && setTimeout(function(){
                        if (+new Date - clickedAt < 2500){
                            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.Kingdee.Express";
                        }
                    }, 1000);
                }, 1500)
            }
        },
        downApp: function() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf("micromessenger") != -1) {
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.Kingdee.Express"
            } else if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1) {
                location.href = "http://itunes.apple.com/app/id458270120?ls=1&mt=8"
            } else if (userAgent.indexOf("android") != -1) {
                location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.Kingdee.Express"
            } else {
                location.href = "https://m.kuaidi100.com/app/"
            }
        }
    };
    $(function() {
        $("#menuBtn").on("click", function(e) {
            e.stopPropagation();
            if ($("#main").hasClass("main-open")) {
                $("#main").removeClass("main-open");
                $("#main article").css("height", '');
                setTimeout(function() {
                    $("#menu").hide()
                }, 400)
            } else {
                $("#menu").show();
                $("#main").addClass("main-open");
                localStorage.setItem("hasOpenMenu", 1);
                $("#main article").css("height", $(window).height())
            }
        });
        $("#main").on("click", function() {
            $("#main").removeClass("main-open");
            $("#main article").css("height", '');
            setTimeout(function() {
                $("#menu").hide()
            }, 400)
        });
        $("#appadClose").click(function() {
            $("#appdl").hide();
            sessionStorage.setItem("ad-appclose", "1")
        });
        $("#openapp").click(function() {
            window.kd.app.openapp("kuaidi100://ilovegirl", "体验更好的快递查询？请安装快递100最新客户端。")
        });
        $("#downApp").click(function() {
            window.kd.app.downApp()
        });
        var hasOpenMenu = localStorage.getItem("hasOpenMenu");
        if (hasOpenMenu != "1") {
            $("#menuBtn").addClass("a-menu-new")
        }
        if (sessionStorage.getItem("ad-appclose") != 1) {
            $("#appdl").show()
        } else {
            $("#appdl").hide();
            $("#content").css("padding-bottom", "0")
        }
        setTimeout(function() {
            $("#appdl").css("visibility", "visible")
        }, 1000)
        $("#viewPage").on("click", function(){
            setcookie_kuaidi100("viewpage", 'www');
            window.location.href = "https://www.kuaidi100.com/";
        });
    })
})();