class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;

    // ゲームのステータス
    this.gameStatus = {
      level: null // 選択されたレベル
    };
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
    const stepKey = 'step1';
    const currentQuestion = this.quizData[this.gameStatus.level][stepKey]; // --- [1]
    
    const choiceStrs = []; // --- [2〜]
    for (const choice of currentQuestion.choices) {
      choiceStrs.push(`<label>
                          <input type="radio" name="choice" value="${choice}" />
                          ${choice}
                        </label>`);
    } // --- [〜2]

    const html = ` 
      <p>${currentQuestion.word}</p>
      <div>
        ${choiceStrs.join('')} // --- [3]
      </div>
      <div class="actions">
        <button class="nextBtn">解答する</button>
      </div>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    // const retireBtnElm = parentElm.querySelector('.retireBtn'); // [4〜] 削除
    // retireBtnElm.addEventListener('click', () => {
    //   this.displayResultView();
    // }); // --- [〜4] 削除

    this.replaceView(parentElm);
  }

  displayResultView() {
    const html = `
      <h2>ゲーム終了</h2>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector('.resetBtn');
    resetBtnElm.addEventListener('click', () => {
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