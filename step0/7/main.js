console.log('ファイル読み込みのテストです');
var element = document.getElementById('innerTest');
element.innerHTML = '<strong>JavaScript</strong>で書きました';

var buttonElm = document.getElementById('testButton');
buttonElm.addEventListener('click', function() {
  var numberElm = document.getElementById('number');
  var val = numberElm.value;
  var num = parseInt(val);
  if (num % 2 == 0) {
    alert('偶数です');
  } else {
    alert('偶数ではありません');
  }
});

var fruits = ['りんご', 'もも', 'みかん']; // --- [1]
var fruitsStr = '';
for (var i = 0; i < fruits.length; i++) { // --- [2]
  fruitsStr += '<li class="fruit">' + fruits[i] + '</li>'; // --- [3]
}

var arrayElm = document.getElementById('arrayTest');
arrayElm.innerHTML = fruitsStr;
