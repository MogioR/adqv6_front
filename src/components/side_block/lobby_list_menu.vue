<template>
  <div>
    <div class="middle_text">
			<span class="login_text text-upper">Профиль</span>
		</div>
    <div class ="add-lobby middle_text">
      <div class="element-menu">
        <input type="button"  id="create-lobby" class = "login_button" value="Создать лобби" v-on:click="createLobby">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LobbySearchMenu',
  methods: {
    createLobby() {
      this.$socket.sendObj({type: "lobby", action: "create"})
    }
  }
}
</script>
