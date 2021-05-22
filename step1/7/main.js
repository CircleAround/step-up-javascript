var displayElm = document.getElementsByClassName('display')[0];
var timer = null;
var startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener('click', function() {
  var seconds = 0;
  timer = setInterval(function() {
    seconds++;
    displayElm.innerText = seconds;
    console.log(seconds);
  }, 1000);

  console.log('start:' + timer); // --- [1]
});

var stopButton = document.getElementsByClassName('stopButton')[0];
stopButton.addEventListener('click', function() {
  console.log('stop:' + timer); // --- [2]
  clearInterval(timer);
  timer = null;
});