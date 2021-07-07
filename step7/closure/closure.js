// Closureのサンプル ///////////////////
function createClosure() {
  const value = 'myClosureValue'; // [1]

  function myClosure() {
    // valueはこの関数の外ではあるが関数と同じスコープにいるので束縛する
    console.log(value);
  }
  return myClosure; // [2]
}

const closure = createClosure(); // [3]
closure(); // [4]

// カプセル化が不十分な例 ///////////////////
function createCounterObject() {
  return {
    value: 0,
    up: function() { 
      // 値を一つ増やす関数
      this.value++; 
    },  
    down: function() { 
      // 値を一つ減らす関数
      this.value--;
    } 
  };
}

const couterObj = createCounterObject();
couterObj.up();
couterObj.up();
couterObj.value = 10; // [1]
couterObj.down();
console.log(couterObj.value); // => 9


// Closureを利用して変数をカプセル化する ///////////////////
function createCounter() {
  // この値は外からいじることができません
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

const counter = createCounter();
counter.up();
counter.up();
counter.down();
//counter.value = 10; // valueは公開されていないのでこの操作はエラーになります
console.log(counter.getValue()); // => 1

