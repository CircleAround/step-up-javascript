class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
    this.init();
  }

  async fetchQuizData() {
    try {
      const response = await fetch('quiz.json');
      this.quizData = await response.json();
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.error(e);
    }
  }

  async init() {
    // 画面のステータス
    this.statusValues = {
      ready: 0,  // ゲーム開始可能
      playing: 1, // ゲームプレイ中
      done: 2 // ゲーム終了
    };
    // ゲームのステータス
    this.gameStatus = {
      level: null, // 選択されたレベル
      step: 1, // 現在表示している問題の番
      results: [], // プレイヤーの回答結果
      timeLimit: 0, // 問題毎の制限時間
      intervalKey: null,
    };
    await this.fetchQuizData();
    this.changeStatus('ready');
    this.updateHtml();
  }

  changeStatus(status) {
    // ゲーム開始前のステータス設定
    this.status = this.statusValues[status];
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.gameStatus.level];
    return this.gameStatus.step === Object.keys(currentQuestions).length;
  }

  resetGame() {
    this.gameStatus.level = null;
    this.gameStatus.step = 1;
    this.gameStatus.results = [];
    this.gameStatus.timeLimit = 0;
    this.gameStatus.intervalKey = null;
  }

  setTimer() {
    this.gameStatus.intervalKey = setInterval(() => {
      this.gameStatus.timeLimit--;
      if (this.gameStatus.timeLimit === 0) {
        this.nextStep();
      } else {
        this.renderTimeLimitStr();
      }
    }, 1000);
  }

  resetIntervalKey() {
    this.gameStatus.intervalKey = clearInterval(this.gameStatus.intervalKey);
  }

  addResult() {
    const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
    const answer = checkedElm ? checkedElm.value : '';
    const currentQuestions = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];

    this.gameStatus.results.push({
      question: currentQuestions,
      selectedAnswer: answer
    });

    console.log(`解答結果: ${answer}`)
  }

  nextStep() {
    this.resetIntervalKey();
    this.addResult();

    if (this.isLastStep()) {
      this.changeStatus('done');
    } else {
      this.gameStatus.step++;
    }

    this.updateHtml();
  }

  calcScore() {
    let correctNum = 0
    const results = this.gameStatus.results;

    for(let i = 0; results.length > i; i++) {
      const result = results[i];
      const selected = result.selectedAnswer;
      const correct = result.question.answer;

      correctNum += selected === correct ? 1 : 0;
    }

    return Math.floor((correctNum / results.length) * 100);
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
    const optionsStr = [];
    for(let i = 0; levelsStr.length > i; i++) {
      optionsStr.push(`<option value="${levelsStr[i]}" name="level">レベル${i + 1}</option>`);
    }

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
      this.changeStatus('playing');
      this.updateHtml();
    });

    return parentElm;
  }

  createQuetionHtml() {
    this.gameStatus.timeLimit = 10;
    console.log(`選択中のレベル:${this.gameStatus.level}`);
    const currentQuestion = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];
    const answerGroup = [];
    const choices = currentQuestion.choices;

    for(let i = 0; choices.length > i; i++) {
      answerGroup.push(`<label>
                          <input type="radio" name="choice" value="${choices[i]}" />
                          ${choices[i]}
                        </label>`);
    }

    const template = `
      <p class="alertMessage"></p>
      <p>${currentQuestion.word}</p>
      <div>
        ${answerGroup.join('\n')}
      </div>
      <button class="nextBtn">回答する</button>
      <p class="sec">残り回答時間:${this.gameStatus.timeLimit}秒</p>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = template;

    const nextBtnElm = parentElm.querySelector('.nextBtn');
    nextBtnElm.addEventListener('click', () => {
      this.nextStep();
    });

    this.setTimer();
    return parentElm;
  }

  renderTimeLimitStr() {
    let secElm = this.rootElm.querySelector('.sec');
    secElm.innerText = `残り回答時間:${this.gameStatus.timeLimit}秒`;
  }

  createResultsHtml() {
    const score = this.calcScore();

    const template = `
      <h2>集計結果</h2>
      <p>正解率: ${score}%</p>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = template;

    const resetBtnElm = parentElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.changeStatus('ready');
      this.resetGame();
      this.updateHtml();
    });

    return parentElm;
  }
  
}

new WordQuiz(document.getElementById('app'));
