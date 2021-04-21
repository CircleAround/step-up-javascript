<script>
  export default {
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
</script>