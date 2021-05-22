var displayElm = document.getElementsByClassName('display')[0];
var startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener('click', function() {
  console.log('start');
  var seconds = 0;
  setInterval(function() {
    seconds++;
    displayElm.innerText = seconds;
    console.log(seconds);
  }, 1000);
});
