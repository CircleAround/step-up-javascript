function stopWatch(options = {}) {
  function addMessage(message) {
    const messageElm = document.createElement('div');
    const now = new Date();
    messageElm.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒 ${message}`;
    messageElm.classList = ['message'];
    logElm.appendChild(messageElm);
  }

  let {color, backgroundColor} = options;

  color = color || 'lightblue';
  backgroundColor = backgroundColor || 'black';

  const display = document.getElementsByClassName('display')[0];
  display.style.color = color;
  display.style.backgroundColor = backgroundColor;

  const logElm = document.querySelector('.log');
  let timer = null;

  const startButton = document.getElementsByClassName('startButton')[0];
  startButton.addEventListener('click', () => {
    if (timer == null) {
      let seconds = 0;
      display.innerText = seconds;

      timer = setInterval(function() {
        seconds++;
        display.innerText = seconds;
      }, 1000);

      addMessage('開始');
    }
  });

  const stopButton = document.getElementsByClassName('stopButton')[0];
  stopButton.addEventListener('click', () => {
    if (timer != null) {
      clearInterval(timer);
      timer = null;

      addMessage('終了');
    }
  });
}

const options = {
  color: 'limegreen',
  backgroundColor: '#333'
};
stopWatch(options);
