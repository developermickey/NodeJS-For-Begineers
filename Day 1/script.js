// fundamentals of JavaScript
// Array and Object
// Fucnations
// Async Await

let arr = [1, 2, 4, 5, 6];

// foreach map filter find indexOf

// every element itrate array
// arr.forEach((item) => {
//   console.log(item);
// });

// map create new array + 1 add ho jaye

// let mike = arr.map((item) => {
//   return item;
// });

// console.log(mike);

// filter kuch filter karke lakar dena

// let fi = arr.filter((item) => {
//   return item > 3;
// });

// console.log(fi);

// find method kuch dundh kar la kar deta hai
// let mike = arr.find((item) => {
//   return item == 2;
// });

// console.log(mike);

// console.log(arr.indexOf(12));

// Object - {} black object key and value ka pair ho to  wo object hota hia

// let obj = {
//   name: "Technical Mickey",
//   age: 12,
// };

// console.log(obj.name);

// funtion ki length nikal sakte hia

// function myFun(a, b, c) {
//   return a + b + c;
// }

// myFun();

// Await

// var blob = await fetch("http://randomuser.me/api/");
// var res = await blob.json();

// console.log(res);

// Line by line code ko run karne ke tarike ko bolte hai synchronous
// Aese code jo ki time lege yeah wait karna padega unke response ko wo side stack me chale jate hai
// jaise hi unse repsoonse milta hai wo run ho jate hai aese code
// asynchronous hote hai

async function myFun() {
  var blob = await fetch("https://randomuser.me/api/");
  var res = await blob.json();
  console.log(res);
}

myFun();
