const LevelSelect = {
  props: ["quizData"],
  data: function () {
    return {
      selectedLevel: 'level1'
    }
  },
  computed: {
    getLevels: function () {
      return Object.keys(this.quizData)
    }
  },
  methods: {
    gameStart: function () {
      this.$emit("game-start", this.selectedLevel)
    }
  },
  template: `
    <div>
      <select v-model="selectedLevel" class="levelSelector">
        <option v-for="(level, index) in getLevels"
          v-bind:value="level"
          v-bind:key="index"
        >レベル{{ index + 1 }}</option>
      </select>
      <button v-on:click="gameStart">スタート</button>
    </div>
  `
}

const Answer = {
  props: ["question"],
  data: function() {
    return {
      leftTime: 10,
      selectedChoice: '',
      intervalKey: this.startInterval()
    }
  },
  methods: {
    nextStep: function () {
      this.intervalKey = clearInterval(this.intervalKey)
      this.$emit("push-answer", this.selectedChoice)
      this.startInterval()
      this.leftTime = 10
    },
    handleTimeLimit: function () {
      this.leftTime--
      if (this.leftTime === 0) { this.nextStep() }
    },
    startInterval: function () {
      return this.intervalKey = setInterval(() => this.handleTimeLimit(), 500)
    }
  },
  template: `
    <div>
      <p class="alert Message"></p>
      <p>{{ question.word }}</p>
      <div>
        <span v-for="choice in question.choices" v-bind:key="choice">
          <label>
            <input v-bind:value="choice" v-model="selectedChoice" type="radio">
            {{ choice }}
          </label>
        </span>
      </div>
      <button v-on:click="nextStep" class="nextBtn">回答する</button>
      <p class="sec">残り回答時間{{ leftTime }}秒</p>
    </div>
  `
}

const Result = {
  props: ["results"],
  computed: {
    calcScore: function () {
      const correctQuestionNum = this.results.filter((result)=>{
        return result.selectedAnswer === result.question.answer;
      }).length

      return Math.floor((correctQuestionNum / this.results.length) * 100)
    }
  },
  methods: {
    resetGame: function () {
      this.$emit('reset-game')
    }
  },
  template: `
    <div class="results">
      <p>正解率{{ calcScore }}%</p>
      <button v-on:click="resetGame" class="resetBtn">開始画面に戻る</button>
    </div>
  `
}

const App = {
  data: function() {
    return {
      quizData: [],
      level: null,
      step: null,
      results: [],
      status: 0
    }
  },
  created: function() {
    this.handleFetch()
  },
  methods: {
    handleFetch: async function () {
      await this.fetchQuizData()
      console.table(this.quizData)
    },
    fetchQuizData: async function () {
      const response = await fetch('quiz.json');
      return this.quizData = await response.json();
    },
    gameStart: function (value) {
      this.status = this.statusValues.playing
      this.step = 1
      this.level = value
    },
    pushAnswer: function (value) {
      this.results.push({ question: this.currentQuestion.word, selectedAnswer: value })
      if (this.isLastStep()) {
        this.step = null;
        this.status = this.statusValues.done;
      }
      this.step += 1
    },
    isLastStep: function () {
      const currentQuestions = this.quizData[this.level];
      return this.step === Object.keys(currentQuestions).length;
    },
    resetGame: function () {
      this.level = null
      this.step = null
      this.timeLimit = 0
      this.intervalKey = null
      this.results = []
      this.status = this.statusValues.ready;
    }
  },
  computed: {
    currentComponent: function () {
      if(this.status === this.statusValues.ready) {
        return 'level-select'
      } else if(this.status === this.statusValues.playing) {
        return 'answer'
      } else if(this.status === this.statusValues.done) {
        return 'result'
      } else {
        throw '想定外のゲームステータスです'
      }
    },
    currentQuestion: function () {
      if (this.status === this.statusValues.playing) {
        return this.quizData[this.level][`step${this.step}`]
      } else {
        return {}
      }
    },
    statusValues: function () { return { ready: 0, playing: 1, done: 2 } }
  },
  components: {
    'level-select': LevelSelect,
    'answer': Answer,
    'result': Result
  },
  template: `<component v-bind:is="currentComponent" 
              v-bind:quizData='quizData'
              v-bind:question='currentQuestion'
              v-bind:results='results'
              v-on:game-start="gameStart"
              v-on:push-answer="pushAnswer"
              v-on:reset-game="resetGame"
             ></component>`
}

new Vue({
  el: "#app",
  components: {
    'App': App
  },
  template: '<App></App>'
})