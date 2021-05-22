var startButton = document.getElementsByClassName('startButton')[0];

startButton.addEventListener('click', function() {
  console.log('start');
  var seconds = 0; // --- [1]
  setInterval(function() {
    seconds++;
    console.log(seconds);
  }, 1000); // --- [2]
});
