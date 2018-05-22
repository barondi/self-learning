//ES5中没有类的概念 通过构造函数实现
//ES6 class
//类的继承 三种属性 共有属性(__proto__) 私有属性 静态方法(静态属性)

// function Parent(){
//     //构造函数中的this 通过new调用那么this指代的是实例
//     this.name='parent';
// }
// Parent.prototype.eat=function(){
//     console.log('eat');
// }
// console.log(Parent.prototype.constructor === Parent);//true
// let parent = new Parent();
// parent.eat();//等价于parent.__proto__.eat(); 先找私有属性,找不到再找共有属性


function Parent(){
    //构造函数中的this 通过new调用那么this指代的是实例
    this.name='parent';
}
Parent.prototype.eat=function(){
    console.log('eat');
}
function Child(){
    this.age=9;
    Parent.call(this);
}
Child.prototype.smoking=function(){
    console.log('smoking');
}
//console.log(child.__proto__.constructor.age);//child.__proto__.constructor => Child 属性定义在实例上
//1.继承私有属性 Parent.call(this)
//console.log(child.name);
//2.继承公有属性
//1)Child.prototype.__proto__=Parent.prototype;
//2)Object.setPrototypeOf(Child.prototype,Parent.prototype)
Child.prototype=Object.create(Parent.prototype,{constructor:{value:Child}});
// function create(parentPrototype){
//     function Fn(){}
//     Fn.prototype=parentPrototype;
//     return new Fn();
// }

let child=new Child();
console.log(child.constructor);//[Function: Parent]
//继承公有属性和私有属性

//百度搜索 Object.c  找到 你不直到的javascript