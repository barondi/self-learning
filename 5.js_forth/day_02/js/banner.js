var banner=document.getElementById('banner'),
    bannerInner=utils.firstChild(banner),
    bannerTip=utils.children(banner,'ul')[0],
    bannerLink=utils.children(banner,'a'),
    bannerLeft=bannerLink[0],
    bannerRight=bannerLink[1],
    divList=bannerInner.getElementsByTagName('div'),
    imgList=bannerInner.getElementsByTagName('img'),
    oLis=bannerTip.getElementsByTagName('li');
//1、Ajax读取数据
var jsonData=null;
~function(){
    var xhr=new XMLHttpRequest;
    xhr.open('get','bannerData?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && /^2\d{2}$/.test(xhr.status)){
            jsonData=utils.formatJSON(xhr.responseText);
        }
    };
    xhr.send(null);
}();

//2、实现数据绑定
~function(){
    var str='',str2='';
    if(jsonData){
        for(var i= 0,len=jsonData.length;i<len;i++){
            var curData=jsonData[i];
            str+="<div><img src='' trueImg='"+curData['img']+"' /></div>";
            i===0 ? str2+="<li class='bg'></li>" : str2+="<li></li>";
        }
    }
    bannerInner.innerHTML=str;
    bannerTip.innerHTML=str2;
}();

//3、图片延迟加载
setTimeout(lazyImg,500);
function lazyImg(){
    for(var i= 0,len=imgList.length;i<len;i++){
        (function(i){
            var curImg=imgList[i];
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
}

//4、实现自动轮播
var interval=2000,autoTimer=null,step=0;//->step记录当前展示图片索引
autoTimer=setInterval(autoMove,interval);
function autoMove(){
    //->当我们已经把最后一张展示完成后(step等于最后一张索引),我们应该从新展示第一张,此时我们让step=0
    step===jsonData.length-1 ? step=0 : step++;
    setBanner();
}
//->实现轮播图切换和焦点对齐
function setBanner(){
    //->让step索引对应的div的zIndex=1,其它div的zIndex=0;
    for(var i= 0,len=divList.length;i<len;i++){
        var curDiv=divList[i];
        if(i===step){
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
    //->实现焦点对齐
    for(var i= 0,len=oLis.length;i<len;i++){
        i===step ? utils.addClass(oLis[i],'bg') : utils.removeClass(oLis[i],'bg');
    }
}
//->实现点击焦点切换
(function(){
    for(var i= 0,len=oLis.length;i<len;i++){
        var curLi=oLis[i];
        curLi.index=i;
        curLi.onclick=function(){
            step=this.index;
            setBanner();
        }
    }
})();
//->实现左右切换
bannerRight.onclick=autoMove;
bannerLeft.onclick=function(){
    step===0 ? step=jsonData.length-1 : step--;
    setBanner();
}
//->实现鼠标悬停控制轮播的播放
banner.onmouseover=function(){
    clearInterval(autoTimer);
    bannerLeft.style.display=bannerRight.style.display='block';
}
banner.onmouseout=function(){
    autoTimer=setInterval(autoMove,interval);
    bannerLeft.style.display=bannerRight.style.display='none';
}
