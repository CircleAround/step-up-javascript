// 無名関数
const testFunction = function () {
  //...
};

testFunction();

// アロー関数も無名関数の一種です
const testFunction2 = () => {
  //...
};

testFunction2();

// 無名関数を利用したcreateCounter関数
function createCounter() {
  // この値を外から自由に操作されるとカウンターに想定外の値が入ってしまいます。
  let value = 0;
  return {
    up: function() {
      value++;
    },
    down: function() {
      value--;
    },
    getValue: function() {
      return value;
    }
  };
}

// 即時関数
var testValue = 'test'; // [1]
(function(){ // [2]
  // この中の処理も順番に実行される。
  var testValue = 'test1'; // [5]
  // ...
})(); // [3]

console.log(testValue); // [4]

// これは上記の即時関数とほぼ同じ動作です。
// letやconstはブロックスコープなのでこれだけでOKです。
{
  let testValue = 'test1';
  // ...
}