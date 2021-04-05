console.log('undefined---');

let isUndefined;
console.log(isUndefined); // => undefined

const obj = {};
console.log(obj.unknownKey); // => undefined

function test() {  
}
console.log(test()); // => undefined

function test2(abc) {
  console.log(abc); // => undefined
}
test2();
