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
    //3)Child.prototype=Object.create(Parent.prototype,{constructor:{value:Child}});
Child.prototype=Object.create(Parent.prototype,{constructor:{value:Child}});

//Object.create()实现原理
function create(parentPrototype,props){
    function Fn(){}
    Fn.prototype=parentPrototype;
    let fn=new Fn();
    for(var key in props){
        Object.defineProperty(fn,key,{
            ...props[key],
            enumerable:true
        })
    }
    return fn;
}

//Object.defineProperty(obj,prop,{initialValue})详解
// let obj={age:20};
// //obj.name='djs';//直接赋值,在赋值之前不能做其它事情
// Object.defineProperty(obj,'name',{
//     enumerable:true,
//     configurable:true,
//     //writable:true,
//     //value:'djs'
//     //使用get和set方法就不可以出现writable和value了,它们两个方法也是一对取值和赋值,并且扩展一些额外对操作
//     get(){
//         console.log('get取值之前');
//         return 'djs'
//         //return this.age
//     },
//     set(val){
//         console.log('set赋值之前');
//         //this.age=val;
//     }
// })
// console.log(obj.name);
// obj.name=25;
// console.log(obj.name);

let child=new Child();
console.log(child.constructor);
//3.继承公有属性和私有属性 Child.prototype=new Parent() 不会采用这种方式

function Fn(name){
    this.name=name;
    function eat(){
        console.log('eat');
    }
}
Fn.prototype.age='25';
Fn.prototype.show=function(){
    console.log('show');
}
var fn1=new Fn('fn1');
console.log(fn1);
console.log(fn1.__proto__);
console.log(fn1.name);
console.log(fn1.age);

var fn2=Object.create(Fn);
console.log(fn2);
console.log(fn2.__proto__.name);
console.log(fn2.name);
console.log(fn2.age);