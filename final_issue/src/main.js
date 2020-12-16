class WordQuiz {
  constructor(rootEl) {
    this.rootEl = rootEl
    this.statusValues = {
      ready: 0,
      playing: 1,
      done: 2
    }
    this.init()
  }

  init() {
    (async() => {
      this.resetGame()
      const response = await fetch(`quiz.json`).catch(err => console.log(err))
      this.quizData = await (() => response.json() )()
      this.updateView()
    })()
  }

  isReadyStatus() {
    return this.status === this.statusValues.ready
  }

  isPlayingStatus() {
    return this.status === this.statusValues.playing
  }

  isDoneStatus() {
    return this.status === this.statusValues.done
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
  
  startGame(level) {
    this.status = this.statusValues.playing
    this.currentGameStatus.step = 1
    this.currentGameStatus.timeLimit = 10
    this.updateView(() => {
      this.currentGameStatus.intervalKey = setInterval(() => {
        this.currentGameStatus.timeLimit--
        if (this.currentGameStatus.timeLimit === 0) {
          this.nextStepView()
        } else {
          this.rendertimeLimitView()        
        }
      }, 1000);
    })
  }

  getCurrentQuestion() {
    return this.quizData[this.currentGameStatus.level][`step${this.currentGameStatus.step}`]
  }

  isLastStep() {
    const currentQuestions = this.quizData[this.currentGameStatus.level]
    return this.currentGameStatus.step === Object.keys(currentQuestions).length
  }

  nextStep() {
    if (this.isLastStep()) {
      this.currentGameStatus.step = null
    } else {
      this.currentGameStatus.step++
    }
  }

  calcScore() {
    const correctQuestionNum = this.currentGameStatus.results.filter((result)=>{
      return result.selectedAnswer === result.question.answer
    }).length
    if (correctQuestionNum === 0) {
      this.currentGameStatus.score = 0
      return
    }
    this.currentGameStatus.score = Math.floor((correctQuestionNum / this.currentGameStatus.results.length) * 100)
  }

  createEl(tagName, text, attributes) {
    let attrs = attributes || {}
    const el = document.createElement(tagName)
    if (text) el.innerText = text
    if (attrs.classList) {
      attrs.classList.forEach((className) => {
        el.classList.add(className)
      })
    }
    const attrNames = ['id', 'href', 'value', 'type', 'name', 'checked']
    attrNames.forEach((name)=> {
      if (attrs[name]) el[name] = attrs[name]
    })

    return el
  }

  updateView(callback) {
    let contentEl
    if (this.isReadyStatus()) {
      contentEl = this.createStartView()
    } else if (this.isPlayingStatus()) {
      contentEl = this.createQuetionView()
    } else if (this.isDoneStatus()) {
      contentEl = this.createResultsView()
    }

    this.rootEl.innerText = ''
    this.rootEl.appendChild(contentEl)

    if (typeof callback === 'function') {
      callback()
    }
  }

  createStartView() { 
    const fragment = document.createDocumentFragment();
    const selectEl = this.createEl('select', null)
    Object.keys(this.quizData).forEach((level, index) => {
      if (index === 0) {
        this.currentGameStatus.level = level
      }
      selectEl.appendChild(this.createEl('option', level, {value: level, name: 'level'}))
    })
    selectEl.addEventListener('change', (e) => {
      this.currentGameStatus.level = e.target.value
    })
    const btnEl = this.createEl('button', 'スタート', {classList: ['startBtn']})
    btnEl.addEventListener('click', () => this.startGame())

    fragment.appendChild(selectEl)
    fragment.appendChild(btnEl)
    return fragment
  }

  createQuetionView() {
    const fragment = document.createDocumentFragment();
    const rootEl = this.createEl('div', '', {classList: ['question']})
    const currentQuestion = this.getCurrentQuestion()
    const wordEl = this.createEl('p', currentQuestion.word)
    const choicesEl = this.createEl('div')
    currentQuestion.choices.forEach((choice, index) => {
      const labelEl = this.createEl('label', '')
      const choiceEl = this.createEl('input', '', {type: 'radio', name: 'choice', value: choice, checked: index === 0})
      labelEl.appendChild(choiceEl)
      labelEl.appendChild(document.createTextNode(choice))
      choicesEl.appendChild(labelEl)
    })
    rootEl.appendChild(wordEl)
    rootEl.appendChild(choicesEl)

    const nextBtnEl = this.createEl('button', '回答する', {classList: ['nextBtn']})
    nextBtnEl.addEventListener('click', () => this.nextStepView())

    rootEl.appendChild(nextBtnEl)
    fragment.appendChild(rootEl)

    return fragment
  }

  nextStepView() {
    this.currentGameStatus.timeLimit = 10

    if (this.currentGameStatus.intervalKey) {
      clearInterval(this.currentGameStatus.intervalKey)
    }

    this.addResult(document.querySelector('input[name="choice"]:checked').value)
    let callback
    if (this.isLastStep()) {
      this.status = this.statusValues.done
      this.calcScore()
    } else {
      this.nextStep()
      callback = () => {
        this.currentGameStatus.intervalKey = setInterval(() => {
          if (this.currentGameStatus.timeLimit === 0) {
            this.nextStepView()
          } else {
            this.rendertimeLimitView()        
          }
          this.currentGameStatus.timeLimit--
        }, 1000);
      }
    }

    this.updateView(callback)
  }

  rendertimeLimitView() {
    let secEl = this.rootEl.querySelector('.sec')
    if (!secEl) {
      secEl = this.createEl('div', null, {classList: ['sec']})
    }
    secEl.innerText = ''
    secEl.appendChild(this.createEl('p', `残り回答時間:${this.currentGameStatus.timeLimit}秒`))
    this.rootEl.appendChild(secEl)
  }

  createResultsView() {
    const fragment = document.createDocumentFragment();
    const rootEl = this.createEl('div', '', {classList: ['results']})
    const scoreEl = this.createEl('p', `正解率${this.currentGameStatus.score}%`)
    const backBtnEl = this.createEl('button', '開始画面に戻る', {classList: ['backBtn']})
    backBtnEl.addEventListener('click', () => {
      this.resetGame()
      this.updateView()
    })
    rootEl.appendChild(scoreEl)
    rootEl.appendChild(backBtnEl)
    fragment.appendChild(rootEl)

    return fragment
  }
}

new WordQuiz(document.getElementById('app'))