function log(text) {
  output.innerHTML = `${output.innerHTML}<br>${text}`;
}

const output = document.getElementById('output');

document.getElementById('sync').addEventListener('click', () => {
  // この例はたくさんの計算処理をすることを重たい処理として記述しています。
  // あまりに待ち時間が多い（もしくは少ない）と思う場合には数値を調整してみてください。
  // 計算処理の実行中は押したボタンの描画も止まっており、実行ボタンを押しても
  // 即実行されることがありません。画面の描画も止まってしまいます。
  log('同期開始');
  let a = 10;
  for(let i = 0; i < 1000000000; ++i) { 
    a *= i;
  }
  log('同期終了');
});

document.getElementById('async').addEventListener('click', () => {
  // この例は「3秒待つ」ということを裏で行われる重たい処理のイメージで記述しています。
  // 3秒の待ちの間も実行ボタンは押すことができます。待ちの間も画面の描画は行われます。
  log('非同期開始');
  setTimeout(() => {
    log('非同期終了');
  }, 3000);
});

document.getElementById('doit').addEventListener('click', () => {
  log('実行');
});
