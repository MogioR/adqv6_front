<template>
  <div id="game" class="center_box">
    <div class="titleContent-conteiner">
      <div class="titleContent">
        <div class="titleName"> 
          <span v-bind:class="[titleNameClass]">{{gameAnswer}}</span>
        </div>
        <div class="titleQustion">
          <div class="titleDecriptionText">
            <span class="titleDescription">
              {{gameQuestion}}
            </span>
          </div>
        </div>
        <div class="timerBar">
          <div class="timerBar-element">
            <span class="login_text text-upper" v-if="gamePhase == 'question'"> {{gameSettings.question_phase_time - timerCount}} </span>
            <span class="login_text text-upper" v-if="gamePhase == 'answer'"> {{gameSettings.answer_phase_time - timerCount}}</span>
          </div>
          <div class="timerBar-element">
            <span class="login_text text-upper"> {{roundCount}} / {{gameSettings.round_count}} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="gameInput-conteiner">
      <form class="gameInput" v-on:submit.prevent="enterAnswer(in_answer)">
        <input class="titleSearch" ref="titleSearch" type="text" placeholder="Аниме"  v-model="in_answer" v-on:input="requestHints(in_answer)" v-on:keyup.down="focus()">
        <select class= "titleSelect" ref="hintSelector" name="answerSelect" size="5" v-if="showHints" v-model="selected" v-on:keyup.enter="enterAnswer(in_answer)" v-on:click="enterAnswer(in_answer)">
          <option v-for="hint of gameHints" :key="hint.id">{{hint}}</option>
        </select>
      </form>
    </div>
    <div class="playersBar">
        <div class="playerBarElement" v-for="(player, index) of lobbyPlayersList" :key="player.id" :class="getAnswerClass(index)">
          <div class="playerBarElementAvatar">
            <span class="titleDescription">{{playersAnswers[index]['answer']}}</span>
          </div>
          <div class="playerBarElementScore">
            <span class="titleDescription">{{player.score}}</span>
          </div>
          <div class="playerBarElementLogin">
            <span class="titleDescription">{{player.name}}</span>
          </div> 
          <div class="playerBarElementLevel">
           <span class="titleDescription">{{player.level}}</span>
          </div>
        </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Game',
  computed: mapGetters(["gameQuestion", "gameAnswer", "gameHints", "questionType", "gameSettings", "gamePhase", "lobbyPlayersList", "playersAnswers"]),
  data() {
    return {
      roundCount: 1,
      timerCount: 0,
      titleNameClass: "titleNameText",
      showHints: false,
      selected: '',
      in_answer: '',
      timer: null
    }
  },
  methods: {
    requestHints(answer) {
      if (answer.length > 3) {
        this.$socket.sendObj({type: "game", action: "reqestHints", data: answer})
      }
      else {
        this.showHints = false
      }
    },
    enterAnswer(answer) {
      this.$refs.titleSearch.focus()
      this.showHints = false
    },
    focus(item) {
      if (this.gameHints.length != 0) {
        if (this.showHints == false) {
          this.$socket.sendObj({type: "game", action: "reqestHints", data: this.in_answer});
        }
        else {
          this.$refs.hintSelector.focus();
          this.$refs.hintSelector.options[0].selected = true;
          this.$refs.hintSelector.selectedIndex = 0;
          this.in_answer = this.$refs.hintSelector.value;
        }
      }
    },
    getAnswerClass(index) {
      console.log(this.playersAnswers)
      if (this.playersAnswers.length > 0 && this.gamePhase == 'answer')
        if (this.playersAnswers[index]['answerCheck'])
          return 'trueAnswer'
        else
          return 'falseAnswer'
      else
        return 'noneAnswer'
    }
  },
  watch: {
    gamePhase(gamePhaseOld, gamePhaseNew) {
      if (gamePhaseNew == 'question') {
        this.roundCount += 1;
        this.in_answer = '';
      }

      this.timerCount = 0;
      
      this.timer = setTimeout(() => {
        this.timerCount++;
      }, 1000);
    },
    timerCount(a, b) {
      clearTimeout(this.timer)
      this.timer =setTimeout(() => {
        this.timerCount++;
      }, 1000);
    },
    gameAnswer(newAnswer, oldAnswer) {
      if (newAnswer.length <= 42) {
        this.titleNameClass = "titleNameText"
      }
      else {
        this.titleNameClass = "titleNameTextSmall"
      }
    },
    selected(newSelected, oldSelected) {
      this.in_answer = newSelected
    },
    gameHints(newGameHints, oldGameHints) {
      if (newGameHints.length == 0) {
        this.showHints = false
      }
      else {
        this.showHints = true
      }
    },
    in_answer(newAnswer, oldAnswer) {
      console.log('New answer')
      this.$socket.sendObj({type: "game", action: "newAnswer", data: newAnswer})
    }
  }
}
</script>

<style>
.falseAnswer {
   background-color: rgb(255, 0, 0);
}
.trueAnswer {
   background-color: rgb(0, 255, 0);
}
.noneAnswer {
  background-color: rgba(2, 0, 109, 0.493);
}
.playersBar {
  display: flex;
  width: 100%;
  height: 270px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: center;
  /* background-color: rgb(255, 0, 0); */
}
.playerBarElement {
  margin: 0px 10px;
  padding: 5px;
  height: 270px;
  width: 150px;
  border-radius: 15px;
  z-index: 0;
  /* background-color: rgba(2, 0, 109, 0.493); */
}
.playerBarElementAvatar {
  height: 180px;
  width: 150px;
  border-radius: 15px;
  background-color: rgba(32, 32, 32, 0.5);
}

.playerBarElementLevel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;

  height: 45px;
  width: 45px;
  float: left;
  border-radius: 15px;
  background-color: rgba(32, 32, 32, 0.5);
}

.playerBarElementScore {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;

  width: 150px;
  height: 45px;
  border-radius: 15px;
  background-color: rgba(32, 32, 32, 0.5);
}

.playerBarElementLogin {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;

  height: 45px;
  width: 105px;
  float: left;
  border-radius: 15px;
  background-color: rgba(32, 32, 32, 0.5);
}

.timerBar-element {
  margin: 0px 10px;
}
.titleName {
    width: 100%;
    height: 50px;
}
.titleNameText {
  font-size: 25pt;
  text-shadow: #000 0 0 4px;
	opacity: 1;
	color: rgb(255,255,255);
}
.titleNameTextSmall {
  font-size: 15pt;
  text-shadow: #000 0 0 4px;
	opacity: 1;
	color: rgb(255,255,255);
}
.titleQustion {
  width: calc(100%-20px);
  border-radius: 15px;
  height: 100%;
  margin: 0px 10px;
  background-color: rgb(0, 5, 68);
  opacity: 0.5;
}
.titleDecriptionText {
  width: calc(100%-20px);
  height: calc(100%-20px);
  margin: 10px;
}
.timerBar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
}
.titleContent-conteiner {
    display: flex;
    width: 100%;
	  text-align: center;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
}
.titleContent {
    display: flex;
    flex-direction: column;
    width: 700px;
    height: 500px;
    background-color: rgb(80,80,150, 0.5);
    border-radius: 10px;
    text-align: center;
    overflow-y: auto;
}

.titleDescription {
    display: inline-block;
    vertical-align: middle;
    text-align: justify;
    color: rgb(255, 255, 255);
    font-size: 20px;
}

.gameInput-conteiner {
    display: flex;
	  text-align: center;
    width:100%;
    align-items: center;
    justify-content: center;
}

.gameInput {
    width: 600px;
    height: 50px;
    padding: 0px;
    z-index: 1;

}

.titleSearch {
    width: 99%;
    height: 35px;
    padding: 0px;
    margin: 0px;
    font-size: 20px;
    text-align: center;
    background-color: rgb(80,80,150, 0.5);
}

.titleSelect {
    text-align: center;
    font-size: 20px;
    margin: 0px;
    width: 100%;
    height: 200px;
    overflow-y: auto;
    background-color: rgb(80,80,150, 0.5);
}

html * /* override x.xhtml.ru style */ 
{
  scrollbar-width: thin;
  scrollbar-color: rgba(108, 108, 255, 0.438) rgba(18, 14, 255, 0.404);
}
*::-webkit-scrollbar,
html *::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}
*::-webkit-scrollbar-track,
html *::-webkit-scrollbar-track {
  background: rgba(255, 166, 0, 0);
}
*::-webkit-scrollbar-thumb,
html *::-webkit-scrollbar-thumb {
  background-color: #606dbc;
  border-radius: 5px;
  border: 3px solid #828fdd;
}
</style>