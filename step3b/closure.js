// Closureのサンプル ///////////////////
function createClosure() {
  // createClosure関数が終わったらアクセスできないはずの変数
  const myClosureValue = 'myClosureValue';

  function myClosure() {
    // myClosureValueはこの関数の外ではあるが関数と同じスコープにいるので束縛する
    console.log(myClosureValue);
  }
  return myClosure;
}

const closure = createClosure();

// createClosure関数は既に終了しているので、createClosureの中にあったmyClosureValueの
// 値は破棄されてエラーになりそうに感じるかもしれませんが、実はそうではありません。
// myClosure関数が変数を束縛してくれているからです。
closure(); // => myClosureValue

// Closureを利用して変数をカプセル化する ///////////////////
function createCounter() {
  // この値を外から自由に操作されるとカウンターに想定外の値が入ってしまいます。
  let value = 0;

  // 値を一つ増やす関数
  function up() { 
    value++; 
  }

  // 値を一つ減らす関数
  function down() { 
    value--;
  }

  // 今の値を取り出す関数
  function getValue() {
    return value;
  } 

  return {up: up, down: down, getValue: getValue};
}

const counter = createCounter();

// 決まった操作しかできないのでバグが少なくなります
counter.up();
counter.up();
counter.down();
//counter.value = 10; // valueは公開されていないのでこの操作はできません
console.log(counter.getValue());

// カプセル化が壊れている例 ///////////////////
function createCounterObject() {
  function up() { 
    this.value++; 
  }

  function down() { 
    this.value--;
  }

  return {up: up, down: down, value: 0};
}

const couterObj = createCounterObject();
couterObj.up();
couterObj.up();
couterObj.value = 10; // valueが公開されているのでこれができてしまう！
couterObj.down();
console.log(couterObj.value);
