//实现双向数据绑定的方案: 发布订阅模式 脏值检测 Object.defineProperty Proxy

function update(){
    console.log('更新');
}
function $set(obj,callback){
    let $data = new Proxy(obj,{
        set(target,key,value){
            update();
            target[key] = value;
        }
    })
    callback($data);
}
let obj={name:'zfpx',age:{age:1}};
$set(obj,function($data){
    $data.name='hello world';
});
