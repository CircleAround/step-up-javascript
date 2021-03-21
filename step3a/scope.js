console.log('> ブロックスコープのサンプル'); 
function blockScope() {

  // 下のif文はロジックとしての意味は無いのですが
  // myFuncVar1の変数の性質を確認する為のブロックを入れる為のコードです。
  // 続く関数スコープの話と一緒に理解してください。  
  if(true) {
    const myFuncVar1 = 'myFuncVar1-true'; // これがブロックスコープの変数です
    console.log(myFuncVar1);  
  } else {
    const myFuncVar1 = 'myFuncVar1-false'; // これがブロックスコープの変数です
    console.log(myFuncVar1);  
  }

  // ブロックは意図的に書くこともできます
  {
    const myFuncVar2 = 'myFuncVar2'; // これがブロックスコープの変数です
    console.log(myFuncVar2);  
  }

  // console.log(myFuncVar2); // エラー: ブロックの外なので利用できません
}

blockScope();

console.log('> 関数スコープのサンプル');
function funcScope() {
  var myFuncVar1 = 'myFuncVar1'; // これが関数スコープの変数です
  console.log(myFuncVar1);
}

funcScope();

// console.log(myFuncVar1); // エラー: 関数の外なのでmyFuncVar1は利用できません



console.log('> グローバルスコープのサンプル');

// 最上位（関数等で囲まれていない）でのvarはグローバルスコープに変数を宣言します。
var myGlobalVar = 'myGlobalVar';

// これもグローバルスコープに変数を宣言しています
myGlobalVar1 = 'myGlobalVar1';

function myFunction1() {
  // 関数の中で初めて使いましたが、varやconstが付いていないのでグローバル変数です
  myGlobalVar2 = 'myGlobalVar2';
}

console.log(myGlobalVar1);

//console.log(myGlobalVar2); // エラー: まだ宣言していないのでここで呼ぶとエラー
myFunction1(); // 関数の中でグローバル変数myGlobalVar2が宣言されます
console.log(myGlobalVar2); // ここでmyGlobalVar2は利用できます

// ブラウザではグローバル変数はwindowオブジェクトのプロパティとして扱われます
console.log(window.myGlobalVar2);


console.log('> 変数の巻き上げのサンプル');

function funcHoisting() {
  var myFuncVar1 = 'myFuncVar1'; // [1]
  console.log(myFuncVar1);

  if(true) {
    var myFuncVar1 = '変更！'; // [2]
    console.log(myFuncVar1);
  }

  console.log(myFuncVar1); // [3] => "変更！"
}

funcHoisting();


function blockHoisting() {
  let myFuncVar1 = 'myFuncVar1'; // [1]
  console.log(myFuncVar1);

  if(true) {
    let myFuncVar1 = '変更！'; // [2]
    console.log(myFuncVar1);
  }

  // varの時には変更されましたが、ブロック変数なので影響を受けません
  console.log(myFuncVar1); // [3] => "myFuncVar1"

  // let myFuncVar1 = '重複'; // [4] エラー: 同じスコープ内には同名の変数は作れません
}

blockHoisting();