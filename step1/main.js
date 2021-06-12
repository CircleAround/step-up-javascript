function stopWatch(options) {
  function addMessage(message) {
    var messageElm = document.createElement('div');
    var now = new Date();
    messageElm.innerText = now.getHours() + '時' + now.getMinutes() + '分' + now.getSeconds() + '秒 ' + message;
    messageElm.classList = ['message'];
    logElm.appendChild(messageElm);
  }

  options = options || {};
  var color = options.color || 'lightblue';
  var backgroundColor = options.backgroundColor || 'black';
  var displayElm = document.getElementsByClassName('display')[0];
  displayElm.style.color = color;
  displayElm.style.backgroundColor = backgroundColor;

  var logElm = document.querySelector('.log');
  var timer = null;

  var startButton = document.getElementsByClassName('startButton')[0];
  startButton.addEventListener('click', function(){
    if(timer === null) { 
      var seconds = 0;
      displayElm.innerText = seconds;
  
      timer = setInterval(function(){
        seconds++;
        displayElm.innerText = seconds;
      }, 1000);

      addMessage('開始');
    }
  });

  var stopButton = document.getElementsByClassName('stopButton')[0];
  stopButton.addEventListener('click', function(){
    if(timer !== null) {
      clearInterval(timer);
      timer = null;

      addMessage('終了');
    }
  });
}

var options = { 
  color: 'limegreen', 
  backgroundColor: '#333'
};
stopWatch(options);
