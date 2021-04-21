const array1 = [1, 4, 9, 16];

// const map = array1.map(function(val){
//     return 2*val;
// })

const map = array1.map(val=>{return 2*val});

console.log(map);

let numbers = [1,4,9,16,25,36];

let roots = numbers.map(function(val){
    return Math.sqrt(val);
})

console.log(numbers);

console.log('Square root of given numbers');

console.log(roots);

let kvArray = [{key: 1, value: 10},{key: 2, value: 20},{key: 3, value: 30}]

