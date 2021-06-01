console.log('ファイル読み込みのテストです');
var element = document.getElementById('innerTest');
element.innerHTML = '<strong>JavaScript</strong>で書きました';

var buttonElm = document.getElementById('testButton'); // --- [1]
buttonElm.addEventListener('click', function() { // --- [2〜]
  alert('ボタンが押されました');
}); // [〜2]
