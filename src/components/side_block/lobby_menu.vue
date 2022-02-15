<template>
  <div>
    <div class="middle_text">
      <span class="login_text text-upper">Лобби</span>
    </div>
    <div class ="middle_text">
      <div class="element-menu">
        <input type="button" class ="login_button" value="Начать игру" v-on:click="startGame">
      </div>
      <div class="element-menu">
        <input type="button"  class ="login_button" value="Отключиться">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LobbyMenu',
  methods: {
    startGame() {
      this.$socket.sendObj({type: "lobby", action: "start"})
    }
  }
}
</script>