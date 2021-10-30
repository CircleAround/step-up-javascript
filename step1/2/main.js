// startButtonというclassが付いているタグ要素のうち、
// 最初のもの（スタートボタン）を取り出す
var startButton = document.getElementsByClassName('startButton')[0]; // --- [1]

// 取り出したstartButtonに対してクリックイベントのリスナを仕掛ける
startButton.addEventListener('click', function() {
  // この行はクリックした時呼ばれる
  console.log('start');
});
