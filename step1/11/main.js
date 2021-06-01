function addMessage(message) {
  var messageElm = document.createElement('div');
  var now = new Date(); // --- [1]
  messageElm.innerText = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒 ' + message; // --- [2]
  messageElm.classList = ['message']; // --- [3]
  logElm.appendChild(messageElm);
}

var displayElm = document.getElementsByClassName('display')[0];
var logElm = document.querySelector('.log');
var timer = null;

var startButton = document.getElementsByClassName('startButton')[0];
startButton.addEventListener('click', function() {
  if (timer == null) {
    var seconds = 0;
    timer = setInterval(function() {
      seconds++;
      displayElm.innerText = seconds;
      console.log(seconds);
    }, 1000);

    // var message = '開始';
    // var messageElm = document.createElement('div');
    // messageElm.innerText = message;
    // logElm.appendChild(messageElm);

    addMessage('開始');
  }
});

var stopButton = document.getElementsByClassName('stopButton')[0];
stopButton.addEventListener('click', function() {
  if (timer != null) {
    clearInterval(timer);
    timer = null;
    
    addMessage('終了');
  }
});