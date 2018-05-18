/*
* 1、模版解析器(阿里)
* */
// var greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}';
// var employee = {
//     name: 'XiaoMing',
//     age: 11,
//     job: {
//         jobName: 'designer',
//         jobLevel: 'senior'
//     }
// };
// // var result = greeting.render(employee);
// // console.log(result);//My name is XiaoMing, age 11, I am a designer

//方法一:正则
// String.prototype.render = function(obj) {
//     return this.replace(/\$\{(\w+|\w+\.\w+)\}/g, match => {
//         var keys = match.replace('${', '').replace('}', '').split('.')
//         return keys.reduce((acc, cv) => acc[cv], obj)
//     })
// }

//方法二:with函数
// String.prototype.render = function (obj) {
//     with(obj) {
//         return eval('`' + this + '`')
//     }
// }

//方法三:字符串模版
//拿键声明变量 => 拒绝循环所以用keys => 数组转成字符串再组合对象字符 => eval去构造解构 => OK!
// String.prototype.render = function(obj) {
//     // 利用了ES6的解构、对象keys新方法，在函数内部解构并自动展开变量
//     eval(`var {${Object.keys(obj).join(',')}} = obj`)
//     // 利用eval使字符串直接作为ES6解析
//     return eval('`' + this + '`')
// }


/*
* 2、类数组转化为数组的方法归纳
*   1)Array的slice方法,此方法如果不传参数的话会返回原数组的一个拷贝
*       Array.prototype.slice.call(arguments) 等同于 [].slice.call(arguments)
*   2)ES6之Array.from(arguments)
*   3)ES6之扩展运算符... 数据结构转换成数组,要求数据结构可Iterator
*       ES6中可表示'集合'概念的数据类型:Array Object Set Map
*       var args = [...arguments]
*   4)JQuery中var $args=$.makeArray(arguments)
* */



