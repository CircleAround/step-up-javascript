class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm;
  }

  async init() {
    await this.fetchQuizData(); // --- [1]
    this.displayStartView(); // --- [2]
  }

  async fetchQuizData() { // --- [3〜]
    try {
      const response = await fetch('quiz.json');
      this.quizData = await response.json();
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました';
      console.log(e);
    }
  } // --- [〜3]

  displayStartView() { // --- [4]
    const levelStrs = Object.keys(this.quizData); // --- [5]

    const optionStrs = [];
    for (let i = 0; i < levelStrs.length; i++) {
      optionStrs.push(`<option value="${levelStrs[i]}" name="level">レベル${i + 1}</option>`);
    }

    const html = `
      <select class="levelSelector">
        ${optionStrs.join('')}
      </select>
    `;
    const parentElm = document.createElement('div');
    parentElm.innerHTML = html;

    this.rootElm.appendChild(parentElm); // --- [6]
  }
}

new WordQuiz(document.getElementById('app')).init();
