export default {
    actions: {
        updateState({ commit, getters, dispatch }, newState) {
            commit('updateState', newState)
        }
    },
    mutations: {
        updateState(state, newState) {
            state.currentState = newState
        }
    },
    state: {
        currentState: "authorisation"
    },
    getters: {
        currentState(state) {
            return state.currentState
        }
    }
}