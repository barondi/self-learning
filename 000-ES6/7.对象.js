//__proto__ 链
var obj1={
    name:'djs'
}
var obj2={
    age:20
}
// obj1.__proto__=obj2;
// console.log(obj1.age);

//在ES6中可以在对象内直接操作__proto__;也可以通过Object.setPrototypeOf
// Object.setPrototypeOf(obj1,obj2);
// console.log(Object.getPrototypeOf(obj1));
// console.log(obj1.age);

let obj3={
    name:'djs',
    age:20
};
let obj={
    name:'new djs',
    getPName(){//可以通过super关键字获取到父属性
        return super.name
    },
    __proto__:obj3
};
console.log(obj.name);//'new djs'
console.log(obj.getPName());//'djs'
