import Vue from 'vue'

export default {
    actions: {
        sendMessage: function({ commit, getters, dispatch }, message) {
            Vue.prototype.$socket.send(message)
        },
        login: function({ commit, getters, dispatch }, message) {
            console.log('Login message: ' + JSON.stringify(message))
            if (message.login)
                dispatch('updateState', 'lobbySearch')
        }, 
        lobbyList: function({ commit, getters, dispatch }, message) {
            console.log('lobbySearch message: ' + JSON.stringify(message))
            if (message.type == "setLobbyList")
              dispatch('updateLobbyList', message.lobbies)
        },
        lobby: function({ commit, getters, dispatch }, message) {
            console.log('lobby message: ' + JSON.stringify(message))
            if (message.type == "setPlayerList")
              dispatch('updateLobbyPlayerList', message.players)
            else if (message.type == "enter")
              dispatch('updateState', 'lobby')
            else if (message.type == "startGame")
              dispatch('updateState', 'game')
            else if (message.type == "setLobbySettings")
              dispatch('updateGameSettings', message.settings)
        },
        game: function({ commit, getters, dispatch }, message) {
            console.log('game message: ' + JSON.stringify(message))
            if (message.type == "newQuestion") {
                if (message.questionType == 'text') {
                  dispatch('updateQuestion', message.text)
                  dispatch('updateAnswer', '?')
                  dispatch('updateGamePhase', 'question')
                }
            }
            else if (message.type == "trueAnswer") {
              if (message.questionType == 'text') {
                dispatch('updateQuestion', message.fullQuestion)
                dispatch('updateAnswer', message.trueAnswer)
                dispatch('updateGamePhase', 'answer')
              }
            }
            else if (message.type == 'newHints') 
              dispatch('updateHints', message.hints)

        }
    },
    mutations: {
        SOCKET_ONOPEN (state, event)  {
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
          },
          SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false
          },
          SOCKET_ONERROR (state, event)  {
            console.error(state, event)
          },
          // default handler called for all methods
          SOCKET_ONMESSAGE (state, message)  {
            state.socket.message = message
            console.log('New message mutation: ' + JSON.stringify(message))
          },
          // mutations for reconnect methods
          SOCKET_RECONNECT(state, count) {
            console.info(state, count)
          },
          SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
          },
    },
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
          }
    },
    getters: {
      
    }
  }
  