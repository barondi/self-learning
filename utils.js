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

    /*
    * getIndex:获取指定dom元素的索引值
    * */
    getIndex:function(ele){
        var index=0;
        var p=ele.previousSibling;
        while(p){
            if(p.nodeType===1){
                index++;
            }
            p= p.previousSibling;
        }
        return index;
    },

    /*
     * getSiblings:获取指定dom元素的所有元素兄弟节点
     * */
    getSiblings:function(ele){
        var nodes=ele.parentNode.childNodes;
        var temp=[];
        for(var i=0;i<nodes.length;i++){
            if(nodes[i]!=this && nodes[i].nodeType===1){
                temp.push(nodes[i]);
            }
        }
        return temp;
    },

    /*
    * prevSiblings:获取指定dom元素的所有哥哥元素节点
    * */
    prevSiblings:function(ele){//找哥哥元素思想是遇到自己就返回
        var nodes=ele.parentNode.childNodes;
        var temp=[];
        for(var i=0;i<nodes.length;i++){
            if(nodes[i]==ele){
                break;
            }
            if(nodes[i].nodeType===1){
                temp.push(nodes[i]);
            }
        }
        return temp;
    },

    /*
     * nextSiblings:获取指定dom元素的所有哥哥元素节点
     * */
    nextSiblings:function(ele){
        var nodes=ele.parentNode.childNodes;
        var temp=[];
        for(var i=nodes.length-1;i>=0;i--){
            if(nodes[i]==ele){
                break;
            }
            if(nodes[i].nodeType===1){
                temp.unshift(nodes[i]);
            }
        }
        return temp;
    },

    /*
    * prev:获取指定dom元素相邻的唯一的哥哥
    * */
    prev:function(ele){
        //var temp = utils.prevSiblings(ele);
        //return temp[temp.length-1];
        var p = ele.previousSibling;
        while(p){
            if(p.nodeType==1){
                return p;
            }
            p= p.previousSibling;
        }
        return null;//表示此方法应该有返回值,但是得不到,则应该返回null;如果不写return null,找不到结果,则返回undefined

    },

    /*
    * next:获取指定dom元素相邻的唯一的弟弟
    * */
    next:function(ele){
        var temp=utils.nextSiblings(ele);
        return temp[0];
    },

    /*
    * closest:获取指定dom元素相邻的哥哥和弟弟
    * */
    closest:function(ele){
        var temp1=utils.prev(ele);
        var temp2=utils.next(ele);
        return [temp1,temp2];
    },

    toJSON:function(str){
        return "JSON" in window ? JSON.parse(str) : eval("("+str+")");
    },

    getElementStyle:function(ele,attr){
        return window.getComputedStyle ? getComputedStyle(ele,null)[attr] : ele.currentStyle[attr];
    },

    //计算网页上某个DOM元素距离浏览器的偏移量
    getOffset1:function(ele){
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
     * [优化高大上]第二种获取某个DOM元素距离浏览器的偏移量:
     *   1、ele.getBoundingClientRect()得到一个ClientRect对象里面包含{top:xxx,right:xxx,bottom:xxx,left:xxx,width:xxx,height:xxx}
     * top,bottom,left,height兼容任何浏览器,width,height不兼容IE6-8
     *   2、属性具体表示见1.2.2getBoundingClientRect图解
     *   3、标准浏览器可视窗口起始坐标clientLeft,clientTop为(0,0),IE6-8起始坐标为(2,2)
     *   4、  offsetTop=bcr.top+scrollTop-clientTop
     *        offsetLeft=bcr.left+scrollLeft-clientLeft
     *   5、更综合一下支持getBoundingClientRect()方法用getOffset,不支持用getOffset1
     *   function getOffset(ele){
            if(ele.getBoundingClientRect){
                return getOffsetRect(ele);
            }else{
                return getOffsetSum(ele);
            }
         }
     * */
    getOffset:function(ele){
        var obj={};
        var bcr=ele.getBoundingClientRect();
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop,
            scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft,
            clientTop=document.body.clientTop||document.documentElement.clientTop,
            clientLeft=document.body.clientLeft||document.documentElement.clientLeft;
        obj.offsetTop=bcr.top+scrollTop-clientTop,
        obj.offsetLeft=bcr.left+scrollLeft-clientLeft,
        obj.offsetBottom=bcr.bottom,
        obj.offsetRight=bcr.right,
        obj.width=bcr.width||obj.offsetRight-obj.offsetLeft,
        obj.height=bcr.height||obj.offsetBottom-obj.offsetTop;
        return obj;
    },

    /*
     * 获取鼠标属性pageX、pageY的方法(兼容IE6-8)
     * */
    getPagePos:function(e){
        var scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
        var clientLeft=document.body.clientLeft||document.documentElement.clientLeft;
        var clientTop=document.body.clientTop||document.documentElement.clientTop;
        if(!e.pageX){
            e.pageX=e.clientX+scrollLeft-clientLeft;
            e.pageY=e.clientY+scrollTop-clientTop;
        }
        return {pageX: e.pageX,pageY: e.pageY};
    },

    /*
    * getElementsByCN:根据类名获取对应的元素
    * 如果是单个类名,则先通过eles=(context || document).getElementsByTagNmae('*')获取元素,然后传递给形参;
    * 如果是多个类名,则先通过下方strTrim方法对自己定义类名字符串格式化,然后通过split(' ')分割成数组,在循环中依次调用getElementsByCN.
    * 详细示例参见js_third day_02中1.选项卡性能优化.html
    * */
    getElementsByCN:function(strClass,eles){
        var reg=new RegExp("(^| )"+strClass+"( |$)");
        var temp=[];
        for(var i=0;i<eles.length;i++){
            if(reg.test(eles[i].className)){
                temp.push(eles[i]);
            }
        }
        return temp;
    },
    strTrim:function(str){
        str=str.replace(/(^\s+)|(\s+$)/g,'');
        str=str.replace(/\s{2,}/g,' ');
        return str;
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