console.log("3" == 3); // => true
console.log("3" === 3); // => false

const test1 = {message: 'hello'};
const test2 = {message: 'hello'};
const test3 = test1;
console.log(test1 == test2); // => false
console.log(test1 === test2); // => false
console.log(test1 == test3); // => true
console.log(test1 === test3); // => true