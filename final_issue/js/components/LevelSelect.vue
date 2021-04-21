<script>
  export default {
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
</script>