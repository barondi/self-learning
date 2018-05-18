/*
* 模版字符串取代了原有的字符串拼接功能
*   支持换行,支持取值(字符串拼接换行需要+号连接)
* */
let name='djs';
let age=25;
// let str='Hello~\''+name+'\'今年'+age+'了';
// console.log(str);//Hello~'djs'今年25了

// let str=`Hello~'${name}'今年${age}了`;
// console.log(str);

//面试题:自定义类模版字符串
// let str='Hello~${name}今年${age}了';
// str=str.replace(/\$\{([^}]*)\}/g,function(){
//     return eval(arguments[1]);
//     //使用with语句
//     //with(arguments[1]) arguments[1];
// })
// console.log(str);

//带标签的模板字符串 自定义模板字符串的实现
//Hello~*djs*今年*25*了
// let str=tag`Hello~${name}今年${age}了`;
// function tag(){//第一个参数是字符串数组,第二个参数是第一个变量,...
//     console.log(arguments);
//     let strings=arguments[0];
//     let values=[].slice.call(arguments,1);
//     console.log(strings, values);
//     let str='';
//     for(let i=0;i<values.length;i++){
//         str+=`${strings[i]}*${values[i]}*`;
//     }
//     str+=strings[strings.length-1];
//     return str
// }
// console.log(str);//tag中return的值即为str的值

//includes 是否包含
let url='http://www.baidu.com';
console.log(url.includes('baidu'));
//startsWith 是否以xxx开头
console.log(url.startsWith('http'));
//endsWith 是否以xxx结尾
console.log(url.endsWith('.com'));
/*
* padStart(maxLength,fillString) padEnd(maxLength,fillString) 补全
*   -如果接收字符串的长度大于等于 maxLength ，则返回原始字符串
*   -如果 maxLength 和 fillString.length 相同，则会截取 fillString 的前面部分，使返回字符串长度为 maxLength
*   -如果省略了 fillString ，则使用一个单独空格字符串（”）代替
* 作用:
*   -在文件名或URL中添加计数或ID：’file 001.txt’
*   -进制转化
*   -以等宽字体显示平整的数据
* */
// console.log('x'.padStart(4, 'ab'));//'abax'
// console.log('abcd'.padStart(2, '#'));//'abcd'
// console.log('abc'.padStart(10, '0123456789'));//'0123456abc'
// console.log('x'.padStart(3));//'  x'

