class StopWatch {
  constructor(rootElm, options = {}) {
    this.rootElm = rootElm;
    this.color = options.color || 'lightblue';
    this.backgroundColor = options.backgroundColor || 'black';
    this.timer = null;
    this.init();
  }

  init() {
    this.countElm = this.rootElm.querySelector('.display');
    this.countElm.style.color = this.color;
    this.countElm.style.backgroundColor = this.backgroundColor;
    this.logElm = this.rootElm.querySelector('.log');
    this.startButtonElm = this.rootElm.querySelector('.startButton');
    this.stopButtonElm = this.rootElm.querySelector('.stopButton');
    this.onClickStartBtn();
    this.onClickStopBtn();
  }

  addMessage(message) {
    const now = new Date();
    const messageElm = document.createElement('div');
    messageElm.classList = ['message'];
    messageElm.innerText = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' + message;
    this.logElm.appendChild(messageElm);    
  }

  onClickStartBtn() {
    this.startButtonElm.addEventListener('click', () => {
      if (!this.timer) { 
        let seconds = 0;
        this.countElm.innerText = seconds;
        this.timer = setInterval(() => {
          seconds++;
          this.countElm.innerText = seconds;
        }, 1000);
  
        this.addMessage('開始');
      }
    });
  }

  onClickStopBtn() {
    this.stopButtonElm.addEventListener('click', () => {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
  
        this.addMessage('終了');
      }
    });
  }
}

const options = { 
  color: 'limegreen', 
  backgroundColor: '#333'
};

new StopWatch(document.getElementById('stopWatchPanel'), options);