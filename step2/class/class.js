const str = new String('Test'); // 普段は文字列専用の短縮記法で 'Test' と書けば動いています
console.log(str.length); // => 4
console.log(str.toUpperCase()); // => TEST

{
  // 定義の仕方
  class TextDecorator { // --- [1]
    // コンストラクタ。newされた時に呼ばれます。
    // JavaScriptでは名前は必ずconstructorです。
    constructor() {
      console.log('コンストラクタが呼ばれました');
    }
    
    // メソッド
    decorate() {
      console.log('decorateが呼ばれました');
    }
  }

  // 使い方
  const decorator = new TextDecorator(); // => コンストラクタが呼ばれました
  decorator.decorate(); // => decorateが呼ばれました
}

{
  class TextDecorator {
    constructor(name) { // --- [1]
      console.log('コンストラクタが呼ばれました');
      this.name = name; // --- [2]
    }

    decorate() {
      console.log(`decorateが呼ばれました: ${this.name}`);
      return `■■■ ${this.name} ■■■`; // --- [3]
    }
  }

  const td = new TextDecorator('JS！'); // => コンストラクタが呼ばれました --- [4]
  console.log(td.name); // => JS！ --- [5]
  const str = td.decorate(); // => decorateが呼ばれました: JS！ --- [6]
  console.log(str); // => ■■■ JS！ ■■■
}