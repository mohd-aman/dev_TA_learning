let obj = {};
console.log(obj);

let detail = {
    name: 'Aman',
    age: '30'
}
console.log(detail);

let tony = {
    name: "Tony",
    lastName: "Stark",
    friends: ['Steve', 'Bruce', 'Pete'],
    age: 45,
    isAvenger: true,
    abc: undefined,
    address: {
        stat: "New York",
        city: "Long Island"
    },
    sayHi: function fn() {
        console.log('Iron man says Hello');
        return "Part of the Journey";
    },
}

console.log(tony);
console.log(tony.friends[1]);
console.log(tony["friends"][0]);
console.log(tony.age);
console.log(tony["age"]);
console.log(tony.isAvenger);
console.log(tony["isAvenger"]);
console.log(tony.address);
console.log(tony["address"]);
console.log(tony.address.city);
console.log(tony.address["stat"]);
console.log(tony["address"]["city"]);
console.log(tony.sayHi());
console.log(tony['sayHi']());


let keys_arr = Object.keys(tony);
console.log(keys_arr);

for (let key in tony) {
    console.log(key);
    console.log(tony[key]);
}

for (let i = 0; i < keys_arr.length; i++) {
    let key = keys_arr[i];
    console.log(key);
    console.log(tony[key]);
}
for (let key in keys_arr) {
    console.log(keys_arr[key]);
    console.log(tony[keys_arr[key]]);
}