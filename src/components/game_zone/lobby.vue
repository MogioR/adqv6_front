<template>
  <div id="lobby" class="container vertical-container">
    <div class="player_list_element middle_text">
      <span class="login_text text-upper">Игроки</span>
    </div>
    <div class="player_list_element middle_text" v-for="player of lobbyPlayersList" :key=player.id>
      <span class="login_text text-upper">{{player.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Lobby',
  computed: mapGetters(["lobbyPlayersList"]),
}
</script>

<style>
.player_list_element {
  opacity: 0.8;
  flex-direction: column;
  width: 100vw;
  height: 50px;
	background-color: #606dbc;
	margin: 5px;
	border-radius: 15px;
}
</style>