import Vue from 'vue'
import Vuex from 'vuex'
import current_state from './modules/current_state'
import socket from './modules/socket'
import lobby_list from './modules/lobby_list'
import lobby from './modules/lobby'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    current_state,
    socket,
    lobby_list,
    lobby,
    game
  }
})
