<script>
  import LevelSelect from './LevelSelect';
  import Answer from './Answer';
  import Result from './Result';

  export default {
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
        this.results.push({ question: this.currentQuestion, selectedAnswer: value })
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
</script>