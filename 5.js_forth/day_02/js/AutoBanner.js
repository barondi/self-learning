/*
* 根据js/banner.js中的普通逻辑功能封装的插件
* */
(function(){
    function AutoBanner(curEleId,ajaxURL,interval){
        //->之前存储获取元素的变量作为当前实例的私有行
        this.banner=document.getElementById(curEleId);
        this.bannerInner=utils.firstChild(this.banner);
        this.bannerTip=utils.children(this.banner,'ul')[0];
        this.bannerLink=utils.children(this.banner,'a');
        this.bannerLeft=this.bannerLink[0];
        this.bannerRight=this.bannerLink[1];
        this.divList=this.bannerInner.getElementsByTagName('div');
        this.imgList=this.bannerInner.getElementsByTagName('img');
        this.oLis=this.bannerTip.getElementsByTagName('li');
        //->之前的全局变量变为自己的私有属性
        this.jsonData=null;
        this.interval=interval||2000;
        this.autoTimer=null;
        this.step=0;
        this.ajaxURL=ajaxURL;

        return this.init();
    }
    AutoBanner.prototype={
        constructor:AutoBanner,
        //->Ajax请求数据
        getData:function(){
            var _this=this;
            var xhr=new XMLHttpRequest;
            xhr.open('get',this.ajaxURL+'?_='+Math.random(),false);
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
                    _this.jsonData=utils.formatJSON(xhr.responseText);
                }
            };
            xhr.send(null);
        },
        //->实现数据绑定
        bindData:function(){
            var str='',str2='';
            if(this.jsonData){
                for(var i= 0,len=this.jsonData.length;i<len;i++){
                    var curData=this.jsonData[i];
                    str+="<div><img src='' trueImg='"+curData['img']+"' /></div>";
                    i===0 ? str2+="<li class='bg'></li>" : str2+="<li></li>";
                }
            }
            this.bannerInner.innerHTML=str;
            this.bannerTip.innerHTML=str2;
        },
        //->延迟加载
        lazyImg:function(){
            var _this=this;
            for(var i= 0,len=this.imgList.length;i<len;i++){
                (function(i){
                    var curImg=_this.imgList[i];
                    var oImg=new Image;
                    oImg.src=curImg.getAttribute('trueImg');
                    //所有的事件绑定都是异步的！
                    oImg.onload=function(){
                        curImg.src=this.src;
                        curImg.style.display='block';
                        if(i===0){
                            var curDiv=curImg.parentNode;
                            curDiv.style.zIndex=1;
                            zhufengAnimate(curDiv,{opacity:1},400);
                        }
                        oImg=null;
                    }
                })(i);
            }
        },
        //->自动轮播
        autoMove:function(){
            this.step===this.jsonData.length-1 ? this.step=0 : this.step++;
            this.setBanner();
        },
        //->切换效果和焦点对齐
        setBanner:function(){
            for(var i= 0,len=this.divList.length;i<len;i++){
                var curDiv=this.divList[i];
                if(i===this.step){
                    utils.css(curDiv,'zIndex',1);
                    //->让当前的透明度从0变为1,其它div透明度变为0
                    zhufengAnimate(curDiv,{opacity:1},400,function(){
                        var curDivSib=utils.siblings(this);
                        for(var j= 0,len=curDivSib.length;j++;j++){
                            utils.css(curDivSib[j],'opacity',0);
                        }
                    });
                    continue;
                }
                utils.css(curDiv,'zIndex',0);
            }
            for(var i= 0,len=this.oLis.length;i<len;i++){
                i===this.step ? utils.addClass(this.oLis[i],'bg') : utils.removeClass(this.oLis[i],'bg');
            }
        },
        //->控制自动轮播
        mouseEvent:function(){
            var _this=this;
            this.banner.onmouseover=function(){
                clearInterval(_this.autoTimer);
                _this.bannerLeft.style.display=_this.bannerRight.style.display='block';
            }
            this.banner.onmouseout=function(){
                _this.autoTimer=setInterval(function(){
                    _this.autoMove();
                },_this.interval);
                _this.bannerLeft.style.display=_this.bannerRight.style.display='none';
            }
        },
        //->实现焦点切换
        tipEvent:function(){
            var _this=this;
            for(var i= 0,len=this.oLis.length;i<len;i++){
                var curLi=this.oLis[i];
                curLi.index=i;
                curLi.onclick=function(){
                    _this.step=this.index;
                    _this.setBanner();
                }
            }
        },
        //->实现左右切换
        leftRight:function(){
            var _this=this;
            this.bannerRight.onclick=function(){
                _this.autoMove();
            };
            this.bannerLeft.onclick=function(){
                _this.step===0 ? _this.step=_this.jsonData.length-1 : _this.step--;
                _this.setBanner();
            }
        },

        //->命令模式:init是插件的唯一入口,指挥各个师团协同作战
        init:function(){
            var _this=this;
            this.getData();
            this.bindData();
            setTimeout(function(){
                _this.lazyImg();
            },1000);
            this.autoTimer=setInterval(function(){
                _this.autoMove();
            },this.interval);
            this.mouseEvent();
            this.tipEvent();
            this.leftRight();

            return this;
        }
    }
    window.AutoBanner=AutoBanner;
})();