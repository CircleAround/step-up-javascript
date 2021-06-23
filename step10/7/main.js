class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
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

    const startBtnElm = parentElm.querySelector('.startBtn');
    startBtnElm.addEventListener('click', () => {
      this.displayQuestionView();
    });

    // this.rootElm.appendChild(parentElm); // --- [1] 削除
    this.replaceView(parentElm); // --- [2]
  }

  displayQuestionView() {
    const html = `
      <p>ゲームを開始しました</p>
      <button class="retireBtn">ゲームを終了する</button> // ---[3]
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'question';
    parentElm.innerHTML = html;

    const retireBtnElm = parentElm.querySelector('.retireBtn'); // ---[4〜]
    retireBtnElm.addEventListener('click', () => {
      this.displayResultView();
    }); // ---[〜4]

    // this.rootElm.innerHTML = ''; // --- [5〜] 削除
    // this.rootElm.appendChild(parentElm); // --- [〜5] 削除
    this.replaceView(parentElm); // --- [6]
  }


  displayResultView() { // --- [7]
    const html = `
      <h2>ゲーム終了</h2>
      <button class="resetBtn">開始画面に戻る</button>
    `;

    const parentElm = document.createElement('div');
    parentElm.className = 'results';
    parentElm.innerHTML = html;

    const resetBtnElm = parentElm.querySelector('.resetBtn'); // --- [8〜]
    resetBtnElm.addEventListener('click', () => {
      this.displayStartView();
    }); // --- [〜8]

    this.replaceView(parentElm);
  }

  replaceView(elm) { // --- [9]
    this.rootElm.innerHTML = '';
    this.rootElm.appendChild(elm);
  }
}

new WordQuiz(document.getElementById('app')).init();