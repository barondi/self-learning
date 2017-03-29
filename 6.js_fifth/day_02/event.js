(function(){
    /*
     * bind:处理Dom2级事件绑定兼容性问题
     * @parameter:
     *   curEle:要绑定事件的元素
     *   eventType:要绑定事件类型
     *   eventFn:要绑定的方法
     * */
    function bind(curEle,eventType,eventFn){
        if('addEventListener' in document){
            curEle.addEventListener(eventType,eventFn,false);
            return;
        }
        //->给eventFn装饰并把装饰之前的样子记录下来
        var tempFn=function(){
            eventFn.call(curEle);
        };
        tempFn.mark=eventFn;
        //->采用全局变量的话,如果给同一元素的同一个行为绑定多个不同方法,则得到的都是最后一个方法的装饰,所以在此采用自定义属性的方式
        if(!curEle['myBind'+eventType]){
            curEle['myBind'+eventType]=[];
        }
        //->解决重复问题:每一次在往自定义属性对应的容器前,检查之前是否存在,如果存在,就不需要重新添加,同理也不用添加到事件池中了
        var ary=curEle['myBind'+eventType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===eventFn){
                return;
            }
        }
        ary.push(tempFn);

        curEle.attachEvent('on'+eventType,tempFn);
    }

    function unbind(curEle,eventType,eventFn){
        if('removeEventListener' in document){
            curEle.removeEventListener(eventType,eventFn,false);
            return;
        }
        //->拿eventFn去curEle['myBind']这里找装饰后的结果,找到之后在事件池把装饰后的结果在事件池中移除
        var ary=curEle['myBind'+eventType];
        for(var i=0;i<ary.length;i++){
            if(ary[i].mark===eventFn){
                curEle.detachEvent('on'+eventType,ary[i]);
                //ary.splice(i,1);
                ary[i]=null;
                break;
            }
        }
    }

//->解决顺序问题:不使用浏览器机制的事件池,使用自己模拟标准浏览器的事件池实现
//->on:创建事件池,并且把需要给当前元素绑定的方法依次添加到事件池中
    function on(curEle,eventType,eventFn){
        if(!curEle['myEvent'+eventType]){
            curEle['myEvent'+eventType]=[];
        }
        var ary=curEle['myEvent'+eventType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===eventFn){
                return;
            }
        }
        ary.push(eventFn);
        //->每当执行一次on方法,都会重新给当前元素绑定run方法,而bind方法在我们上面定义的时候实现了绑定,同时解决了this和重复问题
        bind(curEle,eventType,run);
    }

//->off:在当前事件池中把某一个方法移除
    function off(curEle,eventType,eventFn){
        var ary=curEle['myEvent'+eventType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===eventFn){
                //ary.splice(i,1);//容易引起数组塌陷问题(这样每一次移除都会把自定义事件池中方法对应的索引进行修改,在执行fire的时候,索引会乱)
                ary[i]=null;
                break;
            }
        }
    }

//->run:只给当前元素的点击行为绑定一个方法run,当触发事件行为时执行的是run方法,在run方法中根据自己存储的方法顺序依次执行
    function run(e){
        e=e||window.event;
        var flag= e.target?true:false;
        if(!flag){//->为了以后在绑定方法中使用起来方便,我们对事件对象进行兼容处理(IE6-8),然后在下面传递的时候就是兼容处理过的
            e.target= e.srcElement;
            e.preventDefault=function(){
                e.returnValue=false;
            }
            e.stopPropagation=function(){
                e.cancelBubble=true;
            }
        }
        //->this当前点击的这个元素curEle(根据bind中的方法理解)<==>e.target存储的是当前触发的元素curEle
        //->获取自己事件池中绑定的方法,并且让这些方法依次执行
        var ary= this['myEvent'+ e.type];
        for(var i=0;i<ary.length;i++){
            if(typeof ary[i]==='function'){
                ary[i].call(e.target,e);
            }else{
                ary[i]=null;
            }

        }
    }

    window.myEvent={
        on:on,
        off:off
    }
})()
