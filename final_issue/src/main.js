class WordQuiz {
  constructor(rootElm) {
    this.rootElm = rootElm
    this.statusValues = {
      ready: 0,
      playing: 1,
      done: 2
    }
    this.init()
  }

  async init() {
    try {
      this.resetGame()
      const response = await fetch(`quiz.json`).catch(err => console.log(err))
      this.quizData = await response.json()
      this.updateView()
    } catch (e) {
      this.rootElm.innerText = '問題の読み込みに失敗しました'
      console.error(e)
    }
  }

  startGame(level) {
    this.status = this.statusValues.playing
    this.currentGameStatus.step = 1
    this.currentGameStatus.timeLimit = 10
    this.updateView(() => {
      this.currentGameStatus.intervalKey = setInterval
(() => this.handleTimeLimit(), 1000)
    })
  }

  resetGame() {
    this.currentGameStatus = {
      level: null,
      step: null,
      timeLimit: 0,
      intervalKey: null,
      score: 0,
      results: []
    }
    this.status = this.statusValues.ready
  }

  addResult(answer) {
    this.currentGameStatus.results.push({
      question: this.getCurrentQuestion(),
      selectedAnswer: answer
    })
  }

  getCurrentQuestion() {
    return this.quizData[this.currentGameStatus.level][`step${this.currentGameStatus.step}`]
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.currentGameStatus.level]
    return this.currentGameStatus.step === Object.keys(currentQuestions).length
  }

  isPlaying() {
    return this.status === this.statusValues.playing
  }

  nextStep() {
    if (this.isLastStep()) {
      this.currentGameStatus.step = null
      this.status = this.statusValues.done
      this.resetIntervalKey()
      this.calcScore()
    } else {
      this.currentGameStatus.step++
      this.currentGameStatus.timeLimit = 10
    }
  }

  renderNextStep() {
    if(this.isPlaying()) {
      const checkedElm = document.querySelector('input[name="choice"]:checked')
      this.addResult(checkedElm ? checkedElm.value : '')
    }

    let callback
    if (!this.isLastStep()) {
      const callback = () => {
        this.currentGameStatus.intervalKey = setInterval(() => this.handleTimeLimit(), 1000)
      }
    }

    this.nextStep()
    this.updateView(callback)
  }

  handleTimeLimit() {
    this.currentGameStatus.timeLimit--
    if (this.currentGameStatus.timeLimit === 0) {
      this.renderNextStep()
    } else {
      this.rendertimeLimitView()        
    }
  }

  resetIntervalKey() {
    if (this.currentGameStatus.intervalKey) {
      clearInterval(this.currentGameStatus.intervalKey)
    }
  }

  calcScore() {
    const correctQuestionNum = this.currentGameStatus.results.filter((result)=>{
      return result.selectedAnswer === result.question.answer
    }).length

    this.currentGameStatus.score = Math.floor((correctQuestionNum / this.currentGameStatus.results.length) * 100)
  }

  updateView(callback) {
    let view = this.generateCurrentView()
    
    this.rootElm.innerHTML = view
    this.handleListener()
    if (typeof callback === 'function') {
      callback()
    }
  }

  generateCurrentView() {
    switch (this.status) {
      case this.statusValues.ready:
        return this.createStartView()
      case this.statusValues.playing:
        return this.createQuetionView()
      case this.statusValues.done:
        return this.createResultsView()
    }
  }

  createStartView() { 
    const levelsStr = Object.keys(this.quizData)
    this.currentGameStatus.level = levelsStr[0]
    const optionsStr = levelsStr.map((level, index) => {
      return `<option value="${this.escape(level)}" name="level">レベル${index+1}</option>`
    })

    const template = `
      <div>
        <select class="levelSelector">
          ${optionsStr.join('\n')}
        </select>
        <button class='startBtn'>スタート</button>
      </div>
    `

    return template
  }

  createQuetionView() {
    const currentQuestion = this.getCurrentQuestion()
    const answerGroup = currentQuestion.choices.map((choice, index) => {
      return `<label>
                <input type="radio" name="choice" value="${this.escape(choice)}" />
                ${this.escape(choice)}
              </label>`
    })
    let template = `
      <div class="question">
        <p class="alertMessage"></p>
        <p>${this.escape(currentQuestion.word)}</p>
        <div>
          ${answerGroup.join('\n')}
        </div>
        <button class="nextBtn">回答する</button>
        <div class="sec">${this.timeLimitView()}</div>
      </div>
    `
    return template
  }

  createResultsView() {
    const template = `
      <div class="results">
        <p>正解率${this.currentGameStatus.score}%</p>
        <button class="resetBtn">開始画面に戻る</button>
      </div>
    `

    return template
  }

  timeLimitView() {
    return `
      <p>残り回答時間:${this.escape(this.currentGameStatus.timeLimit.toString())}秒</p>
    `
  }

  rendertimeLimitView() {
    let secElm = document.querySelector('.sec')
    if (!secElm) return

    secElm.innerHTML = this.timeLimitView()
  }

  handleListener() {
    switch (this.status) {
      case this.statusValues.ready:
        this.onChangeLevel()    
        this.onClickStartBtn()
        break;
      case this.statusValues.playing:
        this.onClickNextBtn()
        break;
      case this.statusValues.done:
        this.onClickResetBtn()
        break;
    }
  }

  onChangeLevel() {
    const selectorElm = document.querySelector('.levelSelector')
    selectorElm.addEventListener('change', (event) => {
      this.currentGameStatus.level = event.target.value
    })
  }

  onClickStartBtn() {
    const startBtnElm = document.querySelector('.startBtn')        
    startBtnElm.addEventListener('click', (event) => {
      this.startGame()
    })
  }

  onClickNextBtn() {
    const nextBtnElm = document.querySelector('.nextBtn')
    nextBtnElm.addEventListener('click', () => {
      this.renderNextStep()
    })
  }

  onClickResetBtn() {
    const resetBtnElm = document.querySelector('.resetBtn')
    resetBtnElm.addEventListener('click', (event) => {
      this.resetGame()
      this.updateView()
    })
  }

  escape(string){
    return string.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27');
  }
}

new WordQuiz(document.getElementById('app'))