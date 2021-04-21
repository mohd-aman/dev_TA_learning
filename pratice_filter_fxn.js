const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const words = ['spray','limit','elite','exuberant','destruction','destruction','present'];

const result = words.filter(word=>word.length>6)

let res = words.filter(word=>word.startsWith('e'));
console.log(res);

console.log(result);

let filtered = [13,4,5,75,4,3,234,254,5].filter(isBigEnough);

function isBigEnough(value){
    return value>=10;
}

console.log(filtered);

function isPrime(num){
    for(let i=2;i*i<num;i++){
        if(num%i == 0){
            return false;
        }
    }
    return num>1;
}

console.log(array);
console.log(array.filter(isPrime));

let arr = [
    { id: 15 },{ id: -1 },{ id: 0 },{ id: 3 },{ id: 12.2 },{ },{ id: null },{ id: NaN },{ id: 'undefined' }
  ]

  let invalidEntries = 0;

  let arrById = arr.filter(filterById);
  function filterById(val){
      if(Number.isFinite(val.id) && val.id!==0){
          return true;
      }
      invalidEntries++;
      return false;
  }

  console.log('Unfiltered Array\n',arr);

  console.log('Filtered Array\n',arrById);

  console.log('Number of Invalid Entries = ',invalidEntries);

  let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
 
  function filterItems(arr,query){
    return arr.filter(function(ele){
        return ele.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
}

  console.log(filterItems(fruits,'ap'));

  console.log(filterItems(fruits,'an'));

  