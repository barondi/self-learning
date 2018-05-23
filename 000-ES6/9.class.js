/*
* ES6 class
*   1.类只能new
*   2.类可以继承私有,公有和静态方法
*   3.父类的构造函数中如果return了一个引用类型,子类会把这个引用类型当作子类的this
* */

// class Child{
//     constructor(){
//         this.age=9;//私有属性
//     }
//     static a(){//static 属于类上的方法
//         return 1
//     }
//     smoking(){//原型上的方法
//         console.log('smoking');
//     }
// }
// let child=new Child();
// console.log(child.age);
// child.smoking();
// console.log(Child.a());

// class Parent{
//     constructor(){
//         this.name='parent';
//         //return {a:1}
//     }
//     static b(){
//         return 2
//     }
//     eat(){
//         console.log('eat')
//     }
// }
// class Child extends Parent{//extends 要求继承父亲私有,公有
//     constructor(){
//         super();//Parent.call(this)
//         this.age=9;//私有属性
//         this.aa=function(){
//             console.log('aa');
//         }
//     }
//     static a(){//static 属于类上的方法
//         return 1
//     }
//     smoking(){//原型上的方法
//         console.log('smoking');
//     }
// }
// let child=new Child();
// console.log(child)//不加27行返回 { name: 'parent', age: 9, aa: [Function] } 加了后返回 { a: 1, age: 9, aa: [Function] }
// child.aa()
// child.eat();
// console.log(child.name);
// console.log(Child.b());


/*
* ES5实现class
* */
// let Parent=(function(){
//     //写逻辑
//     function P(){
//         _classCallCheck(this,P);
//         this.name='parent';
//     }
//     _createClass(P, [
//         {
//             key:'eat',
//             value:function(){
//                 console.log('吃');
//             }
//         }
//     ],[
//         {
//             key:'b',
//             value:function(){
//                 return 2
//             }
//         }
//     ])
//     return P;
// })();
// function _classCallCheck(instance,constructor){
//     if(!(instance instanceof constructor)){
//         throw new Error('Class constructor Child cannot be invoked without \'new\'');
//     }
// }
// //constructor构造函数 protoProperties原型方法描述 staticProperties静态方法描述
// function _createClass(constructor,protoProperties,staticProperties) {
//     if(protoProperties.length>0){
//         defineProperties(constructor.prototype,protoProperties);
//     }
//     if(staticProperties.length>0){
//         defineProperties(constructor,staticProperties);
//     }
// }
// function defineProperties(target,arr){
//     for(let i=0;i<arr.length;i++){
//         Object.defineProperty(target,arr[i].key,{
//             ...arr[i],
//             configurable:true,
//             enumerable:true,
//             writable:true
//         })
//     }
// }
// let p=new Parent();
// p.eat();
// console.log(Parent.b());



