function addMessage(parentElm, message) {
  var now = new Date();
  var messageElm = document.createElement('div');
  messageElm.classList = ['message'];
  messageElm.innerText = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' + message;
  parentElm.appendChild(messageElm);
}

function stopWatch(options) {
  options = options || {};
  var color = options.color || 'lightblue';
  var backgroundColor = options.backgroundColor || 'black';
  var display = document.getElementsByClassName('display')[0];
  display.style.color = color;
  display.style.backgroundColor = backgroundColor;

  var logElm = document.querySelector('.log');
  var timer = null;

  var startButton = document.getElementsByClassName('startButton')[0];
  startButton.addEventListener('click', function(){
    if (!timer) { 
      var seconds = 0;
      display.innerText = seconds;
  
      timer = setInterval(function(){
        seconds++;
        display.innerText = seconds;
      }, 1000);

      addMessage(logElm, '開始');
    }
  });

  var stopButton = document.getElementsByClassName('stopButton')[0];
  stopButton.addEventListener('click', function(){
    if(timer) {
      clearInterval(timer);
      timer = null;

      addMessage(logElm, '終了');
    }
  });
}

var options = { 
  color: 'limegreen', 
  backgroundColor: '#333'
};
stopWatch(options);
