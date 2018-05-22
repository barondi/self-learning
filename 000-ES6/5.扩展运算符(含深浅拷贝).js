// function spread(x, ...args) {
//     //sum.apply(null,args);//改变了this,注意和call传递参数的区别
//     sum(...args);//展开运算符
// }
// function sum(a,b,c,d) {
//     console.log(a, b, c, d);
// }
// spread('x',1,2,3,4);

// let arr=[...[1,2,3],...[4,5,6]];
// //let arr=[1,2,3].concat([4,5,6])
// console.log(arr);
// console.log(Math.min(...[1, 2, 3, 4]));

/*
* 前提:基本数据类型操作的是栈内存的值,引用数据类型操作的是地址的引用xxxfff000(该地址指向堆内存中的地址)
* 深浅拷贝总结专栏
*   浅拷贝:
*       =赋值实现深拷贝只适合基本数据类型,其它类型均为浅拷贝
*       ES5中数组中slice(0)和concat()可实现首层深拷贝,多层为浅拷贝
*       ES6中...(扩展运算符)可实现首层深拷贝,多层为浅拷贝
*       ES6中Object.assign(target)均为浅拷贝
*   深拷贝:
*       JSON.parse(JSON.stringify(obj))
*       利用递归自定义实现
*
* */
// let num1=1;
// let num2=num1;
// num1=2;
// console.log(num2);//1

// let arr0=['1','2'];
// let arr1=arr0;
// arr0.push('3');
// console.log(arr1);//[ '1', '2', '3' ]
////操作了同一个堆内存块,解决办法:操作不同的堆内存块
// let arr2=['1','2'];
// let arr=[];
// for(let key in arr2){
//     arr[key]=arr0[key];
// }
// arr2.push('3');
// console.log(arr);//[ '1', '2' ]

// let o={name:'000'};
// let o1=o;
// o.name='111';
// console.log(o1);//{ name: '111' }

// let o2={name:{name:'222'}}
// let o3=o2;
// o2.name.name='333';
// console.log(o3);//{ name: { name: '333' } }

//...浅拷贝
// let o4={
//     name:'444'
// }
// let o5={...o4};
// o4.name='555';
// console.log(o5);//{ name: '444' }

//...浅拷贝
// let o6={
//     name:'djs',
//     age:20,
// };
// let o7={
//     other:{
//         school:'燕山大学',
//     }
// };
// let person={...o6,...o7};
// o7.other.school='新燕山大学';
// console.log(person);//{ name: 'djs', age: 20, other: { school: '新燕山大学' } }

//slice(0)是浅拷贝
// let b=[1,2,3];
// let c=b.slice(0);
// b[0]=100;
// console.log(c);//[ 1, 2, 3 ]

//concat()浅拷贝
// var arr1=[1,2,3];
// var arr2=arr1.concat();
// arr1[0]=100;
// console.log(arr2);//[ 1, 2, 3 ]
// var arr3=[1,2,3,[4,5]];
// var arr4=arr3.concat();
// arr3[3][0]=100;
// console.log(arr4);//[ 1, 2, 3, [ 100, 5 ] ]

//ES6 Object.assign(target)
// let arr=[1,2,3];
// let arr1=Object.assign(arr);
// arr[0]=100;
// console.log(arr1);//[ 100, 2, 3 ]

//深拷贝的实现1(正则等会变为对象,不支持函数...)
// let obj={a:1,b:null,fn:function(){},reg:/a/};
// console.log(JSON.parse(JSON.stringify(obj)));

//深拷贝实现2(保留继承关系,递归实现各种类型等拷贝)
// function deepClone(obj){
//     if(typeof obj!=='object') return obj;
//     if(obj==null) return null;
//     if(obj instanceof Date) return new Date(obj);
//     if(obj instanceof RegExp) return new RegExp(obj);
//     let o=new obj.constructor();//不确定是数组还是对象等,所以找它是由谁构造出来的,保留类的继承关系
//     for(let key in obj){
//         o[key]=typeof obj[key]==='object' ? deepClone(obj[key]) : obj[key];
//     }
//     return o;
// }
// let o={a:{a:1}};
// let newO=deepClone(o);
// o.a.a=2;
// console.log(o);
// console.log(newO);
