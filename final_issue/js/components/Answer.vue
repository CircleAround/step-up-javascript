<script>
  export default {
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
        return this.intervalKey = setInterval(() => this.handleTimeLimit(), 1000)
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
</script>