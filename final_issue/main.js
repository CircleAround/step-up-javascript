class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
    this.statusValues = {
      ready: 0,
      playing: 1,
      done: 2
    };
    this.init();
  }

  async init() {
    try {
      this.resetGame();
      const response = await fetch('quiz.json');
      this.quizData = await response.json();
      this.updateHtml();
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.error(e);
    }
  }

  startGame() {
    this.status = this.statusValues.playing;
    this.currentGameStatus.step = 1;
    this.currentGameStatus.timeLimit = 10;
    this.updateHtml(() => {
      this.currentGameStatus.intervalKey = setInterval(() => this.handleTimeLimit(), 1000);
    });
  }

  resetGame() {
    this.currentGameStatus = {
      level: null,
      step: null,
      timeLimit: 0,
      intervalKey: null,
      score: 0,
      results: []
    };
    this.status = this.statusValues.ready;
  }

  addResult(answer) {
    this.currentGameStatus.results.push({
      question: this.getCurrentQuestion(),
      selectedAnswer: answer
    });
  }

  getCurrentQuestion() {
    return this.quizData[this.currentGameStatus.level][`step${this.currentGameStatus.step}`];
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.currentGameStatus.level];
    return this.currentGameStatus.step === Object.keys(currentQuestions).length;
  }

  isPlaying() {
    return this.status === this.statusValues.playing;
  }

  nextStep() {
    if (this.isLastStep()) {
      this.currentGameStatus.step = null;
      this.status = this.statusValues.done;
      this.resetIntervalKey();
      this.calcScore();
    } else {
      this.currentGameStatus.step++;
      this.currentGameStatus.timeLimit = 10;
    }
  }

  renderNextStep() {
    if(this.isPlaying()) {
      const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
      this.addResult(checkedElm ? checkedElm.value : '');
    }

    let callback;
    if (!this.isLastStep()) {
      callback = () => {
        this.currentGameStatus.intervalKey = setInterval(() => this.handleTimeLimit(), 1000);
      };
    }

    this.nextStep();
    this.updateHtml(callback);
  }

  handleTimeLimit() {
    this.currentGameStatus.timeLimit--;
    if (this.currentGameStatus.timeLimit === 0) {
      this.renderNextStep();
    } else {
      this.renderTimeLimitStr();
    }
  }

  resetIntervalKey() {
    if (this.currentGameStatus.intervalKey) {
      clearInterval(this.currentGameStatus.intervalKey);
    }
  }

  calcScore() {
    const correctQuestionNum = this.currentGameStatus.results.filter((result)=>{
      return result.selectedAnswer === result.question.answer;
    }).length;

    this.currentGameStatus.score = Math.floor((correctQuestionNum / this.currentGameStatus.results.length) * 100);
  }

  updateHtml(callback) {
    let html = this.generateCurrentHtml();
    
    this.rootElm.innerHTML = html;
    this.handleListener();
    if (typeof callback === 'function') {
      callback();
    }
  }

  generateCurrentHtml() {
    switch (this.status) {
    case this.statusValues.ready:
      return this.createStartHtml();
    case this.statusValues.playing:
      return this.createQuetionHtml();
    case this.statusValues.done:
      return this.createResultsHtml();
    }
  }

  createStartHtml() { 
    const levelsStr = Object.keys(this.quizData);
    this.currentGameStatus.level = levelsStr[0];
    const optionsStr = levelsStr.map((level, index) => {
      return `<option value="${level}" name="level">レベル${index + 1}</option>`;
    });

    const template = `
      <div>
        <select class="levelSelector">
          ${optionsStr.join('\n')}
        </select>
        <button class='startBtn'>スタート</button>
      </div>
    `;

    return template;
  }

  createQuetionHtml() {
    const currentQuestion = this.getCurrentQuestion();
    const answerGroup = currentQuestion.choices.map((choice) => {
      return `<label>
                <input type="radio" name="choice" value="${choice}" />
                ${choice}
              </label>`;
    });
    let template = `
      <div class="question">
        <p class="alertMessage"></p>
        <p>${currentQuestion.word}</p>
        <div>
          ${answerGroup.join('\n')}
        </div>
        <button class="nextBtn">回答する</button>
        <p class="sec">${this.timeLimitStr()}</p>
      </div>
    `;

    return template;
  }

  createResultsHtml() {
    const template = `
      <div class="results">
        <p>正解率${this.currentGameStatus.score}%</p>
        <button class="resetBtn">開始画面に戻る</button>
      </div>
    `;

    return template;
  }

  timeLimitStr() {
    return `残り回答時間:${this.currentGameStatus.timeLimit.toString()}秒`;
  }

  renderTimeLimitStr() {
    let secElm = this.rootElm.querySelector('.sec');
    if (!secElm) return;

    secElm.innerText = this.timeLimitStr();
  }

  handleListener() {
    switch (this.status) {
    case this.statusValues.ready:
      this.onChangeLevel();
      this.onClickStartBtn();
      break;
    case this.statusValues.playing:
      this.onClickNextBtn();
      break;
    case this.statusValues.done:
      this.onClickResetBtn();
      break;
    }
  }

  onChangeLevel() {
    const selectorElm = this.rootElm.querySelector('.levelSelector');
    selectorElm.addEventListener('change', (event) => {
      this.currentGameStatus.level = event.target.value;
    });
  }

  onClickStartBtn() {
    const startBtnElm = this.rootElm.querySelector('.startBtn');
    startBtnElm.addEventListener('click', () => {
      this.startGame();
    });
  }

  onClickNextBtn() {
    const nextBtnElm = this.rootElm.querySelector('.nextBtn');
    nextBtnElm.addEventListener('click', () => {
      this.renderNextStep();
    });
  }

  onClickResetBtn() {
    const resetBtnElm = this.rootElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.resetGame();
      this.updateHtml();
    });
  }
}

new WordQuiz(document.getElementById('app'));