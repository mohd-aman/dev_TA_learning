//push 
//add elements to the end of the array
let arr =  [1,2,3,4,5,6,7];
arr.push(1);
console.log(arr);
console.log(arr.pop());
console.log(arr);
// both the fxn modify your array 

//unshift 
// adds elements to the starting of the array
// return length of the array after modification
arr.unshift(2);
console.log(arr);

console.log(arr.shift());
console.log(arr);

console.log(arr.unshift(0,8,9));
console.log(arr);

console.log(arr.shift());
console.log(arr);

//splice 
console.log(arr.splice(1,2));
console.log(arr);

