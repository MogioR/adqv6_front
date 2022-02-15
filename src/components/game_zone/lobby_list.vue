<template>
  <div id="lobby-list" class="container vertical-container">
    <div class="container lobby_list">
        <div class="lobby_list_element">
          <div class = "middle_text">
            <span class="login_text text-upper">Глава лобби</span>
          </div>
        </div>
        <div class="lobby_list_element">
          <div class = "middle_text">
            <span class="login_text text-upper">Игроки</span>
          </div>
        </div>

        <div class="lobby_list_element">
          <div class="middle_text">
              <span class="login_text text-upper">Подключиться</span>
          </div>
        </div>
      </div>
      <div class="container lobby_list" v-for="lobby of lobbyList" :key=lobby.id>
        <div class="lobby_list_element">
          <div class = "middle_text">
            <span class="login_text text-upper">{{lobby.host}}</span>
          </div>
        </div>
        <div class="lobby_list_element">
          <div class = "middle_text">
            <span class="login_text text-upper">{{lobby.occupancy}}/{{lobby.size}}</span>
          </div>
        </div>
        <div class="lobby_list_element">
          <input type="button" class = "join_button login_text text-upper" value="Подключиться" v-on:click="joinLobby(lobby.id)">
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'LobbyList',
  data() {
    return {}
  },
  computed: mapGetters(["lobbyList"]),
  methods: {
    joinLobby(lobbyId) {
      this.$socket.sendObj({type: "lobby", action: "connect", id: lobbyId})
    }
  }
}
</script>

<style>
.vertical-container {
  flex-wrap: wrap;
  display: flex;
  align-content: flex-start;
}

.lobby_list {
  width: 100vw;
  justify-content: space-between;
}

.lobby_list_element {
  opacity: 0.8;
  flex: 1;
  float: left;
  width: 300px;
  height: 50px;
	background-color: #606dbc;
	margin-right: 10px;
  margin-left: 10px;
	border-radius: 15px;
  margin-bottom: 10px;
}

.join_button {
  width: 100%;
  height: 100%;
  background-color: #606dbc;
  border-radius: 15px;
}

</style>