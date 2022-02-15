<template>
  <div class="container">
    <div class="container side_block" id="side_block">
        <Authorisation v-if="currentState == 'authorisation'" v-bind:send="sendMessage"> </Authorisation>
        <LobbySearchMenu v-if="currentState == 'lobbySearch'" />
        <LobbyMenu v-if="currentState == 'lobby'" />
        <GameMenu v-if="currentState == 'game'" />
    </div>
    <div class="container game_zone" id="game_zone">
        <AboutBlock v-if="currentState == 'authorisation'" />
        <LobbyList v-if="currentState == 'lobbySearch'" />
        <Lobby v-if="currentState == 'lobby'" />
        <Game v-if="currentState == 'game'" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Authorisation from './components/side_block/authorisation.vue'
import LobbySearchMenu from './components/side_block/lobby_list_menu.vue'
import LobbyMenu from './components/side_block/lobby_menu.vue'
import GameMenu from './components/side_block/game_menu.vue'
import AboutBlock from './components/game_zone/about_block.vue'
import LobbyList from './components/game_zone/lobby_list.vue'
import Lobby from './components/game_zone/lobby.vue'
import Game from './components/game_zone/game.vue'
export default {
  name: 'App',
  components: {
    Authorisation,
    LobbySearchMenu,
    LobbyMenu,
    GameMenu,
    AboutBlock,
    LobbyList,
    Lobby,
    Game
  },
  computed: mapGetters(["currentState"]),
  methods: {
    ...mapActions(["updateState"]),
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  }
}
</script>

<style>
.container {
    margin: 0px;
    padding: 0px;
    display: flex;

    overflow: hidden;
}
.side_block {
    width: 350px;
    height: 100vh;
    float: left;
    background: repeating-linear-gradient(45deg, #606dbc, #606dbc 15px, #465298 15px, #465298 30px);
}
.game_zone {
    width: 100vw;
    height: 100vh;
    flex: 1 0;
    background: repeating-radial-gradient(circle, #B9ECFE, #B9ECFE 10px, #82DDFF 10px, #82DDFF 20px);
}
</style>