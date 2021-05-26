class WordQuiz {
  constructor() {
    console.log('インスタンスが作成されたよ');
  }

  async init() { // [1]
    const response = await fetch('quiz.json');
    this.quizData = await response.json(); // ---[2]
    console.log(this.quizData);
  }
}

new WordQuiz().init(); // --- [3]
