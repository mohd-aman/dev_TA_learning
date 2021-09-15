const express = require('express');

const app = express();

app.listen('5000',function(){
    console.log("server is listening on 5000");
})

app.use(express.json());

app.use(express.static('public'));

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user",userRouter);

app.use("/auth",authRouter);

userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.post(signupUser);

function signupUser(req,res){
    let {email,name,password} = req.body;
    user.push({email,name,password});
    console.log('user',req.body);
    res.json({
        message:'user signedUp',
        user:req.body
    });
}

let user=[];

app.get('/',(req,res)=>{
    res.send('Home Page');
});

function getUser(req,res){
    res.json(user);
}

function createUser(req,res){
    user = req.body;
    res.send("data has been added");
}

function updateUser(req,res){
    let obj = req.body;
    for(let key in obj){
        user[key] = obj[key];
    }
    res.json(user);
}

function deleteUser(req,res){
    user = {};
    res.json(user);
}

function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}