console.log('ファイル読み込みのテストです');
var innerElm = document.getElementById('innerTest');
innerElm.innerHTML = '<strong>JavaScript</strong>で書きました';

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

var fruits = ['りんご', 'もも', 'みかん'];
var fruitsStr = '';
for (var i = 0; i < fruits.length; i++) {
  fruitsStr += '<li class="fruit">' + fruits[i] + '</li>';
}

var arrayElm = document.getElementById('arrayTest');
arrayElm.innerHTML = fruitsStr;

var fruitElms = document.getElementsByClassName('fruit'); // --- [1]
for(var i = 0; i < fruitElms.length; i++) {
  var fruitElm = fruitElms[i];
  console.log(fruitElm.textContent); // --- [2]
}

