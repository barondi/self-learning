/*
* 箭头函数:
*   箭头函数中没有this,往上一级作用域中查找this
*   箭头函数中没有arguments,可结合剩余运算符
*   箭头函数形式如下
* */
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
//3.箭头函数 箭头函数中没有this指向
// let obj={
//     b:1,
//     a:function(){
//         // let that=this;
//         // setTimeout(function(){
//         //     console.log(this);//Window
//         //     console.log(that);
//         // },1000)
//
//         setTimeout(function(){
//             console.log(this);
//         }.bind(this))
//     }
// }
// obj.a();

// let obj={
//     b:1,
//     a:function(){
//         setTimeout(()=>{
//             console.log(this);//obj对象 {b: 1, a: ƒ}
//         },1000)
//     }
// }
// obj.a();

// let obj={
//     b:1,
//     a:()=>{
//         setTimeout(()=>{
//             console.log(this);//Window
//         },1000)
//     }
// }
// obj.a();

//面试题:对象不是作用域,let声明不会声明到全局上
// let a=1;
// let obj={
//     a:2,
//     b:()=>{
//         console.log(this.a);//undefined
//         console.log(a);//1
//     }
// }
// obj.b();

//箭头函数中没有arguments
//...剩余运算符 把多余的都放到数组中(放到最后一个)
// let fn=(x,...args)=>{
//     console.log(args);
// }
// fn('x',1,2,3,4,5)

// let fn=(...arguments)=>{
//     console.log(arguments);
// }
// fn('x',1,2,3,4,5)

