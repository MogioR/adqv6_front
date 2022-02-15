export default {
    actions: {
        updateLobbyList({ commit, getters, dispatch }, newLobbyList) {
            commit('updateLobbyList', newLobbyList)
        }
    },
    mutations: {
        updateLobbyList(state, newLobbyList) {
            state.lobbyList = newLobbyList
        },
        addLobbyToList(state, lobby) {
            state.lobbyList.push(lobby)
        }
    },
    state: {
        lobbyList: []
    },
    getters: {
        lobbyList(state) {
            return state.lobbyList
        },
        countOfLobby(state) {
            return state.lobbyList.lenght
        }
    }
}