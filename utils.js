var utils={
    listToArray:function(likeArray){
        var arr=[];
        try{
            arr=Array.prototype.slice.call(likeArray,0);
        }catch(e){
            for(var i=0;i<likeArray.length;i++){
                arr[arr.length]=likeArray[i];
            }
        }
        return arr;
    },

    toJSON:function(str){
        return "JSON" in window ? JSON.parse(str) : eval("("+str+")");
    },

    getElementStyle:function(ele,attr){
        return window.getComputedStyle ? getComputedStyle(ele,null)[attr] : ele.currentStyle[attr];
    },

    //计算网页上某个DOM元素距离浏览器的偏移量
    getOffset:function(ele){
        var l=ele.offsetLeft;
        var t=ele.offsetTop;
        var p=ele.offsetParent;
        while(l){
            if(!p||p==document.body){
                break;
            }
            if(window.navigator.userAgent.indexOf('MSIE 8.0')>-1){
                //如果是IE8
                l+= p.offsetLeft;
                t+= p.offsetTop;
            }else{
                //在标准浏览器下，需要加上边框的宽
                l+= p.offsetLeft+ p.clientLeft;
                t+= p.offsetTop+ p.clientTop;
            }
            p= p.offsetParent;
        }
        return {left:l,top:t}
    },

    /*
    * 实现hasClass、addClass、removeClass、toggleClass方法
    * */
    hasClass:function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass:function (obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },
    removeClass:function (obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    toggleClass:function (obj,cls){
        if(hasClass(obj,cls)){
            removeClass(obj, cls);
        }else{
            addClass(obj, cls);
        }
    }
};