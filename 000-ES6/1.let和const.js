/*
* var 不支持封闭作用域,会声明到全局作用域
* */
// (function(){
//     for(var i=0;i<3;i++){
//         console.log(i);
//     }
// })()
// console.log(i);

// for(var i=0;i<3;i++){
//     setTimeout(function(){
//         console.log(i);
//     },1000)
// }
// for(var i=0;i<3;i++){
//     (function(i){
//         setTimeout(function(){
//             console.log(i);
//         },1000)
//     })(i)
// }

/*
* let
*   作用域问题:
*       let和{}配合可以产生一个作用域;
*       let支持块级作用域,声明的变量只会声明在当前作用域;
*       let可以解决 作用域污染问题和局部作用域问题
*   当前作用域下变量不可重复声明,如果用let声明过,不要再用var
*   预解释:
*       不存在变量提升
*       暂存死区:如果作用域内有这样一个变量,则这个作用域会绑定这个变量,不会往上级作用域链查找
* */
// for(let i=0;i<3;i++){
//     setTimeout(function(){
//         console.log(i);
//     },1000)
// }
// //console.log(i);//Error i is not defined

// let a=1;
// {
//     //console.log(a);//Error a is not defined
//     let a=2;
// }
// let a=1;
// {
//     console.log(a);
//     a=2;
// }

/*
* const
*   通过const声明的变量不能被修改,不能被修改引用空间
* */
// const a=1;
// //a=2;//Error: Assignment to constant variable

// const obj={name:'djs'};
// obj.name='djs1';
// obj.age=9;
// console.log(obj);
// const obj1={name:'aaa'};
// //obj=obj1;//Error: Assignment to constant variable



