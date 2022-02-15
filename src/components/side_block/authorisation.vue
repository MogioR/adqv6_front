<template>
  <div class="center_box middle_text">
    <div class="middle_text">
      <span class="login_text text-upper">Авторизация</span>
    </div>
    <form>
      <span class="login_text text-upper">
        Псевдоним
        <div class="element-menu">
          <input type="text" v-model="in_login" class = "login_input" size="25">
        </div>
        Пароль
        <div class="element-menu">
          <input type="password" v-model="in_pass" class = "login_input" size="40">
        </div>
        <div class="element-menu">
          <input type="button"  id="login_button" class = "login_button" value="Войти" v-on:click="login">
        </div>
      </span>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Authorisation',
  props: {
    'send': Function
  },
  modules: [
    '@nuxtjs/axios'
  ],
  
  data() {
    return {
      data: {
      }
    }
  },
  methods: {
    ...mapActions(["updateState"]),
    login() {
      this.$socket.sendObj({type: "login", nickname: this.in_login, password: this.in_pass})
      //this.send(JSON.stringify({type: "login", nickname: this.in_login, password: this.in_pass}))
    }
  }
}
</script>

<style>

.center_box {
  margin: auto;
}

.login_input {
	width: 320px;
	height: 35px;
	font-size: 20pt;
	background: #606dbc;
	border-width: 3px;
	border-radius: 15px;
	border-color: #465298;
	text-align: center;
  margin: 5px;
}

.login_button {
	width: 330px;
  margin: 10px;
	font-size: 20pt;
	background: #606dbc;
	border-width: 3px;
	height: 50px;
	text-align: center;
	color: rgb(255,255,255);
}

.login_text {
	font-size: 25pt;
}

.middle_text {
	text-align: center;
}

.text-upper {
	text-shadow: #000 0 0 4px;
	opacity: 1;
	color: rgb(255,255,255);
}
</style>