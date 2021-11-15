class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;

    // ゲームのステータス
    this.gameStatus = {};
    this.resetGame();
  }

  async init() {
    await this.fetchQuizData();
    this.displayStartView();
  }

  async fetchQuizData() {
    try {
      const response = await fetch('quiz.json');
      this.quizData = await response.json();
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.log(e);
    }
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.gameStatus.level];
    return this.gameStatus.step === Object.keys(currentQuestions).length;
  }

  nextStep() {
    this.clearTimer();
    this.addResult();

    if (this.isLastStep()) {
      this.displayResultView();
    } else {
      this.gameStatus.step++;
      this.displayQuestionView();
    }
  }

  addResult() {
    const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
    const answer = checkedElm ? checkedElm.value : '';
    const currentQuestion = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];

    this.gameStatus.results.push({
      question: currentQuestion,
      selectedAnswer: answer
    });

    console.log(`解答結果: ${answer}`);
  }

  calcScore() {
    let correctNum = 0;
    const results = this.gameStatus.results;

    for (const result of results) {
      const selected = result.selectedAnswer;
      const correct = result.question.answer;

      if (selected === correct) {
        correctNum++;
      }
    }

    return Math.floor((correctNum / results.length) * 100);
  }

  resetGame() {
    this.gameStatus.level = null; // 選択されたレベル
    this.gameStatus.step = 1; // 現在表示している設問の番号
    this.gameStatus.results = []; // プレイヤーの解答結果
    this.gameStatus.timeLimit = 0; // 問題毎の制限時間
    this.gameStatus.intervalKey = null; // setIntervalのキー
  }

  setTimer() {
    if(this.gameStatus.intervalKey !== null) { 
      throw new Error('まだタイマーが動いています');
    }
    this.gameStatus.timeLimit = 10;

    this.gameStatus.intervalKey = setInterval(() => {
      this.gameStatus.timeLimit--;
      if (this.gameStatus.timeLimit === 0) {
        this.nextStep();
      } else {
        this.renderTimeLimitStr();
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.gameStatus.intervalKey);
    this.gameStatus.intervalKey = null;
  }

  displayStartView() {
    const levelStrs = Object.keys(this.quizData);
    this.gameStatus.level = levelStrs[0];

    const optionStrs = [];
    for (let i = 0; i < levelStrs.length; i++) {
      optionStrs.push(`<option value="${levelStrs[i]}" name="level">レベル${i + 1}</option>`);
    }

    const html = `
      <select class="levelSelector">
        ${optionStrs.join('')}
      </select>
      <button class="startBtn">スタート</button>
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;

    const selectorElm = parentElm.querySelector('.levelSelector');
    selectorElm.addEventListener('change', (event) => {
      this.gameStatus.level = event.target.value;
    });

    const startBtnElm = parentElm.querySelector('.startBtn');
    startBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    this.replaceView(parentElm);
  }

  displayQuestionView() {
    console.log(`選択中のレベル:${this.gameStatus.level}`);
    this.setTimer();

    const stepKey = `step${this.gameStatus.step}`;
    const currentQuestion = this.quizData[this.gameStatus.level][stepKey];

    const choiceStrs = [];
    for (const choice of currentQuestion.choices) {
      choiceStrs.push(`<label>
                          <input type="radio" name="choice" value="${choice}" />
                          ${choice}
                        </label>`);
    }

    const html = ` 
      <p>${currentQuestion.word}</p>
      <div>
        ${choiceStrs.join('')}
      </div>
      <div class="actions">
        <button class="nextBtn">解答する</button>
      </div>
      <p class="sec">残り解答時間:${this.gameStatus.timeLimit}秒</p>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    const nextBtnElm = parentElm.querySelector('.nextBtn');
    nextBtnElm.addEventListener('click', () => {
      this.nextStep();
    });

    this.replaceView(parentElm);
  }

  renderTimeLimitStr() {
    const secElm = this.rootElm.querySelector('.sec');
    secElm.innerText = `残り解答時間:${this.gameStatus.timeLimit}秒`;
  }

  displayResultView() {
    const score = this.calcScore();

    const html = `
      <h2>ゲーム終了</h2>
      <p>正解率: ${score}%</p>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
      this.resetGame();
      this.displayStartView();
    });

    this.replaceView(parentElm);
  }

  replaceView(elm) {
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(elm);
  }
}

new WordQuiz(document.getElementById('app')).init();