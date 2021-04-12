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
    this.gameStatus.step = 1;
    this.gameStatus.timeLimit = 10;
    this.updateHtml();
    this.gameStatus.intervalKey = setInterval(() => this.handleTimeLimit(), 1000);
  }

  resetGame() {
    this.gameStatus = {
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
    this.gameStatus.results.push({
      question: this.getCurrentQuestion(),
      selectedAnswer: answer
    });
  }

  getCurrentQuestion() {
    return this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.gameStatus.level];
    return this.gameStatus.step === Object.keys(currentQuestions).length;
  }

  isPlaying() {
    return this.status === this.statusValues.playing;
  }

  initDataByStep() {
    this.resetIntervalKey();
    if (this.isLastStep()) {
      this.gameStatus.step = null;
      this.status = this.statusValues.done;
      this.calcScore();
    } else {
      this.gameStatus.intervalKey = setInterval(() => this.handleTimeLimit(), 1000);
      this.gameStatus.step++;
      this.gameStatus.timeLimit = 10;
    }
  }

  nextStep() {
    if(this.isPlaying()) {
      const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
      this.addResult(checkedElm ? checkedElm.value : '');
    }

    this.initDataByStep();
    this.updateHtml();
  }

  handleTimeLimit() {
    this.gameStatus.timeLimit--;
    if (this.gameStatus.timeLimit === 0) {
      this.nextStep();
    } else {
      this.updateTimeLimitStr();
    }
  }

  resetIntervalKey() {
    this.gameStatus.intervalKey = clearInterval(this.gameStatus.intervalKey);
  }

  calcScore() {
    const correctQuestionNum = this.gameStatus.results.filter((result)=>{
      return result.selectedAnswer === result.question.answer;
    }).length;

    this.gameStatus.score = Math.floor((correctQuestionNum / this.gameStatus.results.length) * 100);
  }

  updateHtml() {
    this.rootElm.innerHTML = '';

    switch (this.status) {
    case this.statusValues.ready:
      this.rootElm.appendChild(this.createStartHtml());
      break;
    case this.statusValues.playing:
      this.rootElm.appendChild(this.createQuetionHtml());
      break;
    case this.statusValues.done:
      this.rootElm.appendChild(this.createResultsHtml());
      break;
    }
  }

  createStartHtml() { 
    const levelsStr = Object.keys(this.quizData);
    this.gameStatus.level = levelsStr[0];
    const optionsStr = levelsStr.map((level, index) => {
      return `<option value="${level}" name="level">レベル${index + 1}</option>`;
    });

    const template = `
      <select class="levelSelector">
        ${optionsStr.join('\n')}
      </select>
      <button class='startBtn'>スタート</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.innerHTML = template;

    const selectorElm = parentElm.querySelector('.levelSelector');
    selectorElm.addEventListener('change', (event) => {
      this.gameStatus.level = event.target.value;
    });

    const startBtnElm = parentElm.querySelector('.startBtn');
    startBtnElm.addEventListener('click', () => {
      this.startGame();
    });

    return parentElm;
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
      <p class="alertMessage"></p>
      <p>${currentQuestion.word}</p>
      <div>
        ${answerGroup.join('\n')}
      </div>
      <button class="nextBtn">回答する</button>
      <p class="sec">${this.timeLimitStr()}</p>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = template;

    const nextBtnElm = parentElm.querySelector('.nextBtn');
    nextBtnElm.addEventListener('click', () => {
      this.nextStep();
    });

    return parentElm;
  }

  createResultsHtml() {
    const template = `
      <p>正解率${this.gameStatus.score}%</p>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = template;

    const resetBtnElm = parentElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.resetGame();
      this.updateHtml();
    });

    return parentElm;
  }

  timeLimitStr() {
    return `残り回答時間:${this.gameStatus.timeLimit}秒`;
  }

  updateTimeLimitStr() {
    let secElm = this.rootElm.querySelector('.sec');
    if (!secElm) return;

    secElm.innerText = this.timeLimitStr();
  }

}

new WordQuiz(document.getElementById('app'));