/* eslint no-unused-vars: 0 */
/* eslint no-inner-declarations: 0 */
console.log('プリミティブ型');
let str1 = 'Hello';
const str2 = str1;
str1 = str1.concat('World');
console.log(str2); // => Hello

console.log('オブジェクト型');
const custom1 = {message: "Hello"};
const custom2 = custom1;
custom1.message = "Hi";
console.log(custom2.message); // => Hi

console.log('プリミティブ型を関数に渡した時');
{
  function concatWorld(str) {
    str = str.concat('World'); // strが 'HelloWorld'になりそうに思うかもしれない
  }

  const str1 = 'Hello';
  concatWorld(str1);
  console.log(str1); // => 'Hello' // 変更はされない
}

console.log('オブジェクト型を関数に渡した時');
{
  function concatWorld(custom) {
    custom.message = custom.message.concat('World');
  }

  const custom1 = {message: "Hello"};
  concatWorld(custom1);
  console.log(custom1); // => {message: "HelloWorld"} 
}

