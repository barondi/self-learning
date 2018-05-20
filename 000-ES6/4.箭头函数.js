//箭头函数
//1.箭头函数没有function关键字
//2.小括号和打括号之间有个箭头
//3.如果参数是一个,可以省略小括号
//4.如果只有return,可以不写大括号和return
//5.如果直接返回对象类型,需要小括号包裹

// function fn(a){
//     return a;
// }
// let fn=(a)=>{
//     return a;
// }
// let fn=a=>a;

// function m(c){
//     return function(d){
//         return c+d;
//     }
// }
////等价于如下箭头函数
// let m1=c=>d=>c+d;
// console.log(m1(1)(2));

//特殊性
// function m(c) {
//     return function (d) {
//         return {sum:c+d};
//     }
// }
// let m1=c=>d=>({sum:c+d});
// console.log(m1(1)(2));

//解决this问题
//1.let that=this
//2.使用bind方式绑定this(call apply)
//3.箭头函数
let obj={
    b:1,
    a:function(){
        // let that=this;
        // setTimeout(function(){
        //     console.log(this);//Window
        //     console.log(that);
        // })

        setTimeout(function(){
            console.log(this);
        }.bind(this))
    }
}
obj.a();

