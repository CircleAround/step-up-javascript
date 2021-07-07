// @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures

// プリミティブ型 ///////////////////////////////////////////////////////////

// Number 数値
const typeNum = typeof 3;
console.log(`typeof 3: ${typeNum}`); // => typeof 3: number

// String 文字列
const typeStr = typeof "テスト";
console.log(`typeof "テスト": ${typeStr}`); // => typeof "テスト": string

// Boolean 真偽
const typeBool = typeof true;
console.log(`typeof true: ${typeBool}`); // => typeof true: boolean

// Undefined
const typeUndefined = typeof undefined;
console.log(`typeof undefined: ${typeUndefined}`); // => typeof undefined: undefined

// Symbol シンボル
const typeSymbol = typeof Symbol('test');
console.log(`typeof Symbol('test'): ${typeSymbol}`); // => typeof Symbol('test'): symbol

// Null
const typeNull = typeof null;
console.log(`typeof null: ${typeNull}`); // => typeof null: object

// オブジェクト型 ///////////////////////////////////////////////////////////

// Date 日時
const typeDate = typeof new Date();
console.log(`typeof new Date(): ${typeDate}`); // => typeof new Date(): object

// その他さまざまな型がオブジェクト型

// 不変 ///////////////////////////////////////////////////////////

// プリミティブ型は不変の性質を持つ
let testStr1 = 'Hello';
const testStr2 = testStr1;
console.log(testStr1, testStr2); // => Hello Hello
testStr1 = testStr1.concat('World'); // [1]

// 以下の二つは違う値を示している
console.log(testStr1, testStr2); // => HelloWorld Hello

// オブジェクト型は基本的に不変の性質を持たない
const testDate1 = new Date();
const testDate2 = testDate1;
console.log(testDate1, testDate2); // => Mon Feb 08 2021 18:05:26 GMT+0900 (日本標準時) Mon Feb 08 2021 18:05:26 GMT+0900 (日本標準時)
testDate1.setYear(11223); // [1]

// 以下の二つは同じ値を示している
console.log(testDate1, testDate2); // => Wed Feb 08 11223 18:05:26 GMT+0900 (日本標準時) Wed Feb 08 11223 18:05:26 GMT+0900 (日本標準時)

