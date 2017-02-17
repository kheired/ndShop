var express=require('express');
var fs=require('fs');
var path=require('path');
var bodyParser=require('body-parser');
var Books=require('./db').Books;
var app=express();
app.use(bodyParser.urlencoded({extended:true}));

//bodyParser中间件   使查询字符串转为对象格式
app.use(bodyParser.json());

app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve(__dirname)));
app.get('/',function (req, res) {
    res.sendFile('index.html',{root:__dirname})
});
app.get('/books',function (req, res) {      //获取所有图书
    Books.find({},function (err, docs) {
        if(!err){
            res.send(docs)
        }
    })
});
app.get('/books/:bid',function (req, res) {     //查找一本图书
    var id=req.params.bid;
    Books.findById({_id:id},function (err, doc) {
        res.send(doc);
    })
});
app.post('/books',function (req, res) {         //增加一本图书
    var book=req.body;
    Books.create(book,function (err, doc) {
        res.send(doc);
    })
});
app.delete('/books/:bid',function (req, res) {
    var id=req.params.bid;
    Books.remove({_id:id},function (err, result) {
        if(!err && result.ok==1)
        res.send({});
    })
});
app.put('/books/:bid',function (req, res) {
    var id=req.params.bid;
    var book=req.body;
    Books.update({_id:id},book,function (req, doc) {
        res.send(doc);
    })
});
app.all('*',function (req, res) {
    res.sendFile(path.resolve('index.html'))
});


app.listen(9090,function () {
    console.log('9090,ok')
});