console.log('> オブジェクトに関数を設定した場合におけるthisのサンプル');
const obj1 = {
  name: 'これはobj1です',
  test: function() {
    console.log(this); // [1]
    console.log(this === obj1); // [2]
  }
};

console.log(obj1); // [3] => {name: "これはobj1です", test: ƒ}

obj1.test(); // [4] 
// => {name: "これはobj1です", test: ƒ}
// => true

console.log('> クラスにおけるthisのサンプル');
class MyClass {
  constructor() {
    this.name = 'これはMyClassです';
  }
  
  test() {
    console.log(this); // [1]
    console.log(this === instance1); // [2]
  }
}

const instance1 = new MyClass();
console.log(instance1); // [3] => MyClass { name: "これはMyClassです" }

instance1.test(); // [4]
// => MyClass { name: "これはMyClassです" }
// => true

console.log('> 「呼び出された時」の所有者のサンプル');
const obj2 = {
  name: 'これはobj2です'
};

obj2.test = obj1.test; // obj1の関数の参照をobj2に代入

obj2.test(); // [1]


console.log('> applyのサンプル');

obj1.test.apply(obj2); // obj1.testを呼んでいますが、これのthisをobj2に差し替えて実行します


// グローバルオブジェクト
console.log('> グローバルオブジェクトのサンプル');

// 何も関数に囲まれていないグローバルスコープのthisはグローバルオブジェクトです
console.log(this === window); // => true

function globalTest() {
  console.log(this === window); // => true
}

// オブジェクトに所有されていないのでthisはwindowです
globalTest();

// オブジェクトに所有されている関数の中で、所有されていない関数を使うケース
const nestedSample = {
  nested: function() {
    // このtestのthisもグローバルオブジェクトです
    // オブジェクトに所有されていない為です
    function test() {
      console.log(this === window); // => true
    }

    test();
  }
};

nestedSample.nested();

/////////////
console.log('> アロー関数のサンプル');

const objArrow = {
  name: 'これはobjArrowです',
  test: function() {
    console.log('testの中です');
    console.log(this);

    const arrow = () => {
      console.log('arrowの中です');
      console.log(this); // => {name: "これはobjArrowです", test: ƒ}
      console.log(this === objArrow); // => true
    };

    const normal = function() {
      console.log('normalの中です');
      console.log(this); // => Window
      console.log(this === objArrow); // => false
    };

    arrow();
    normal();
  }
};

console.log(objArrow); // [3] => {name: "これはobjArrowです", test: ƒ}

objArrow.test(); // [4] 


// アロー関数が無かった頃の書き方
const legacyObj = {
  name: '通常関数の場合',
  test: function() {
    const self = this; // [1] 
    document.body.addEventListener('click', function() {
      console.log(self.name); // [2]
    });
  }
};

legacyObj.test();

// アロー関数によってシンプルに書けるようになりました
const arrowObj = {
  name: 'アロー関数の場合',
  test: function() {
    document.body.addEventListener('click', () => {
      console.log(this.name); // これで適切にアクセスできます
    });
  }
};

arrowObj.test();

/////////////
console.log('> コンストラクタのサンプル');

function MyClass2() {
  this.name = 'これはMyClass2です';
  console.log(this);
}

MyClass2.prototype.test = function() { 
  console.log(this === instance2); // => true
  console.log('test!'); 
};

const instance2 = new MyClass2(); // [1]
instance2.test();
