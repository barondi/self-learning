self.onmessage = function(event){
    //var num = event.data;
    //var T = setInterval(function(){
    //    self.postMessage(--num);
    //    if(num <= 0){
    //        clearInterval(T);
    //        self.close();
    //    }
    //}, 1000);


    var data=event.data;
    var StartTime=data[0],NowTime=data[1];
    setInterval(function(){
        var a=new Date();
        if(!b){
            NowTime+=1000;
        }else{
            NowTime=1000+b-a;
        }
        var t=StartTime - NowTime;
        var d=0;
        var h=0;
        var m=0;
        var s=0;
        if(t>0){
            d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
        }
        self.postMessage([d,h,m,s]);
        var b=new Date();
    },1000);
}