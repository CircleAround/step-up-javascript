class WordQuiz {
  constructor(rootElm) { // --- [1]
    // console.log('インスタンスが作成されたよ'); // --- [2] 削除
    this.rootElm = rootElm; // --- [3]
  }

  async init() {
    try { // --- [4]
      const response = await fetch('quiz.json');
      this.quizData = await response.json();
      // console.log(this.quizData); // --- [5] 削除
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました'; // --- [6]
      console.log(e); // --- [7]
    }
  }
}

new WordQuiz(document.getElementById('app')).init(); // --- [8]
