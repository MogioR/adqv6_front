export default {
    actions: {
        updateLobbyPlayerList({ commit, getters, dispatch }, newLobbyPlayerList) {
            commit('updateLobbyPlayerList', newLobbyPlayerList)
        }
    },
    mutations: {
        updateLobbyPlayerList(state, newLobbyPlayerList) {
            state.lobbyPlayerList = newLobbyPlayerList
        },
    },
    state: {
        lobbyPlayerList: []
    },
    getters: {
        lobbyPlayersList(state) {
            return state.lobbyPlayerList
        },
        countOfLobbyPlayers(state) {
            return state.lobbyPlayerList.lenght
        }
    }
}