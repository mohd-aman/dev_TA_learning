const { response } = require('express');
const express = require('express');

const app = express();
let port = '8080';

app.listen(port,function(){
    console.log(`server is listening on port ${port}`)
});

app.get('/',(req,res)=>{
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log("Hello from Home Page");
    res.send("<h1>Hello from Backedn</h1>");
});

let obj = {
    'Name':"Mohd Aman",
}

app.get('/user',(req,res)=>{
    console.log('user');
    res.json(obj);
})

app.get('/home',(req,res)=>{
    console.log(__dirname);
    res.sendFile('./view/index.html',{root:__dirname});
});