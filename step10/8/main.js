class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;

    // ゲームのステータス
    this.gameStatus = { // --- [1〜]
      level: null // 選択されたレベル
    }; // --- [〜1]
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
    this.gameStatus.level = levelStrs[0]; // ---[1]

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

    const selectorElm = parentElm.querySelector('.levelSelector'); // ---[2〜]
    selectorElm.addEventListener('change', (event) => {
      this.gameStatus.level = event.target.value;
    }); // ---[〜2]

    const startBtnElm = parentElm.querySelector('.startBtn');
    startBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    // this.rootElm.appendChild(parentElm);
    this.replaceView(parentElm);
  }

  displayQuestionView() {
    console.log(`選択中のレベル:${this.gameStatus.level}`); // ---[3]

    const html = `
      <p>ゲームを開始しました</p>
      <button class="retireBtn">ゲームを終了する</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    const retireBtnElm = parentElm.querySelector('.retireBtn');
    retireBtnElm.addEventListener('click', () => {
      this.displayResultView();
    });

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