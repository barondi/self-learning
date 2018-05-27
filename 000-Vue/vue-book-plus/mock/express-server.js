let express = require('express');
let app = express();
app.listen(3000);
let fs = require('fs');
let sliders = require('./sliders');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname));
function read(cb) { //用来读取数据的
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err || data.length === 0){
      cb([]); // 如果有错误 或者文件没长度 就是空数组
    }else{
      cb(JSON.parse(data)); // 将读出来的内容转化成对象
    }
  })
}
function write(data,cb) { // 写入内容
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}
let pageSize = 5;// 每页显示五个
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.get('/',function (req,res) {
  res.sendFile('./index.html',{root:__dirname});
});
app.get('/page',function (req,res) {
  let offset = parseInt(req.query.offset);
  read(function (books) {
    let result = books.reverse().slice(offset,offset+pageSize);
    let hasMore = true;
    if(books.length<=offset+pageSize){
      hasMore = false;
    }
    res.json({hasMore,books:result});
  });
});
app.get('/sliders',function (req,res) {
  res.json(sliders)
});
app.get('/hot',function (req,res) {
  read(function (books) {
    let hot = books.reverse().slice(0, 6);
    res.json(hot);
  });
})
app.get('/book',function (req,res) {
  let id = parseInt(req.query.id);
  if(!isNaN(id)){
    read(function (books) {
      let book = books.find(item=>item.bookId===id);
      if(!book) book = {};
      res.json(book);
    });
  }else{
    read(function (books) {
     res.json(books.reverse());
    })
  }
});
app.post('/book',function (req,res) {
    let book = req.body;
    read(function (books) { // 添加id
      book.bookId = books.length?books[books.length-1].bookId+1:1;
      books.push(book); //将数据放到books中 ，books在内存中
      write(books,function () {
        res.json(book);
      });
    });
});
app.delete('/book',function (req,res) {
  read(function (books) {
    books = books.filter(item=>item.bookId !== id);
    write(books,function () {
      res.json({}); // 删除返回空对象
    });
  });
});
app.put('/book',function (req,res) {
  if(req.query.id){
      let book = req.body;
      read(function (books) {
        books = books.map(item=>{
          if(item.bookId === id){
            return book
          }
          return item;
        });
        write(books,function () {
          res.json(book);
        })
      });
  }
});
app.all('*',function (req,res) {
  res.sendFile('./index.html',{root:__dirname});
});
