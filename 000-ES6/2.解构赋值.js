/*
* 解构赋值
*   声明和赋值放到一起了
*   表示等号左边和右边解构类似
* */
//数组的位置必须相同
// let [,num]=['abc',3];
// let {length}=['abc',3];//数组对象中有length这个属性
// console.log(length);

//如果有关键字可以采用:形式(变量)更改名字
// let {name,age,class:cls}={name:'djs',age:25,class:'Person'}
// console.log(cls)

//设置某个属性的默认值,必须采用=的方式


/****数组解构赋值****/
/*基本赋值*/
// let [x,y]=[1,2];
// let [x1,y1]=[1];
// let [x2,y2]=[1,2,3];

/*不定参数赋值*/
// let [m1,m2,m3]=[,'你好','邸佳松'];
// let [...arr]=[1,2,3,4,5];
// console.log(arr);
// let [,,...arr1]=[1,2,3,4,5];
// console.log(arr1);

/*默认值:只有赋值为undefined时才会走默认值*/
// var a=[1,2,3,4];
// let [n=10,m]=a;
// console.log(n);//1   如果a=[],则n为默认值10

/*面试题*/
// var arr=[[[[[1,2,3],[4,5,6]]]]];
// //转换成'1,2,3,4,5,6'
// console.log(arr.toString());
// console.log(arr.join());


/****对象解构赋值****/
/*变量名和属性名相同的情况,name和age是变量,且对象的无序性*/
// let {name,age}={age:10,name:'邸佳松'}

/*变量名跟属性名不同时,前提是属性名必须先一致,a和n为变量*/
// let {age:a,name:n}={age:10,name:'邸佳松'}

/*默认值*/
// let {a:a1=10,b,c}={b:'BB',c:'CC'};
// console.log(a1);//10

// var obj={name:'djs',age:10,fe:['html','js','css']};
// let {name,age,fe:[x1,x2,x3]}=obj;
// console.log(name);
// console.log(age);
// console.log(x1);
//    http://www.cnblogs.com/tugenhua0707/p/6751778.html#_labe1


/****字符串解构赋值****/
// const [a,b,c,d,e]='hello';
// console.log(a,b,c,d,e);//'h''e''l''l''o'
// let {length:len}='hello';
// console.log(len);//5


/****函数参数解构赋值****/
// function add([x, y]) {
//     return x + y;
// }
// console.log(add([1, 2])); // 3

// function move({x = 0, y = 0} = {}) {
//     /*
//     * 函数参数{x=0,y=0}={}设置了函数参数(是个对象)的默认值为{},且函数参数(对象)中属性默认值为0
//     * */
//     return [x, y];
// }
// console.log(move()); // [0, 0]
// console.log(move({})); // [0, 0]
// console.log(move({x: 3})); // [3, 0];
// console.log(move({x:3, y:8})); // [3, 8]

// function scroll({x, y} = {x:0,y:0}) {
//     /*
//     * 函数参数{x,y}={x:0,y:0}只设置了函数参数(是个对象)的默认值
//     * */
//     return [x, y];
// }
// console.log(scroll());//[0,0]
// console.log(scroll({}));//[undefined,undefined]
// console.log(scroll({x:3})); // [3, undefined]
// console.log(scroll({x:3, y:8})); // [3, 8]


/****变量解构的用途****/
/*两个变量交换位置*/
// var num1=1;
// var num2=2;
// [num1,num2]=[num2,num1];
// console.log(num1);
// console.log(num2);

/*取值*/
// function example() {
//     return [1, 2, 3];
// }
// var [a, b, c] = example();
// console.log([a, b, c]); // [1, 2, 3]
// console.log(a); // 1
// console.log(b); // 2
// console.log(c); // 3
// function example2() {
//     return {
//         foo: 1,
//         bar: 2
//     }
// }
// var {foo, bar} = example2();
// console.log(foo); // 1
// console.log(bar); // 2

/*输入模块指定方法*/