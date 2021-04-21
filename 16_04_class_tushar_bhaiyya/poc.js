// let cb=function f1()
// {
//     console.log(' I am Callback');
// }
// // test is a HOF
// function test(cb)
// {
//     console.log(' I am HOF');
//     cb();
// }
// console.log('Before');
// test(cb);
// console.log('After');

//async
let fs = require('fs');

console.log('Before');

let cb=function(err,data)

{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(data+"");
}

fs.readFile('f1.txt',cb);

console.log('After');