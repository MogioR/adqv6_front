export default {
    actions: {
        updateLobbyPlayerList({ commit, getters, dispatch }, newLobbyPlayerList) {
            commit('updateLobbyPlayerList', newLobbyPlayerList)
            let arr = [];
            for(let i = 0; i<newLobbyPlayerList.length; i++)
                arr.push({'answer': '', 'answerCheck': false})
            commit('setGamePlayersAnswers', arr)
        },
        updateLobbyPlayerScore({ commit, getters, dispatch }, answersData) {
            commit('updateLobbyPlayerScore', answersData)
        }
    },
    mutations: {
        updateLobbyPlayerList(state, newLobbyPlayerList) {
            state.lobbyPlayerList = newLobbyPlayerList
        },
        updateLobbyPlayerScore(state, answersData) {
            for(let i = 0; i<answersData.length; i++) {
                if(answersData[i]['answerCheck']) {
                    state.lobbyPlayerList[i]['score']++;
                }
            }
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
            return state.lobbyPlayerList.length
        }
    }
}