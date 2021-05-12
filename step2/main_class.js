class StopWatch {
  constructor(options = {}) {
    this.options = options; // --- [1]
  }

  init() {
    let {color, backgroundColor} = this.options; // --- [2]

    color = color || 'lightblue';
    backgroundColor = backgroundColor || 'black';

    const display = document.getElementsByClassName('display')[0];
    display.style.color = color;
    display.style.backgroundColor = backgroundColor;

    this.logElm = document.querySelector('.log'); // --- [3]

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

        this.addMessage('開始'); // --- [4]
      }
    });

    const stopButton = document.getElementsByClassName('stopButton')[0];
    stopButton.addEventListener('click', () => {
      if (timer != null) {
        clearInterval(timer);
        timer = null;

        this.addMessage('終了'); // --- [5]
      }
    });
  }

  addMessage(message) { // --- [6〜]
    const messageElm = document.createElement('div');
    const now = new Date();
    messageElm.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒 ${message}`;
    messageElm.classList = ['message'];
    this.logElm.appendChild(messageElm);
  } // --- [〜6]
}

const options = {
  color: 'limegreen',
  backgroundColor: '#333'
};
const stopWatch = new StopWatch(options); // --- [7]
stopWatch.init(); // --- [8]
