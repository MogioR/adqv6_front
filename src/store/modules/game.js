export default {
    actions: {
        updateQuestion({ commit, getters, dispatch }, newQuestion) {
            commit('setQuestion', newQuestion)
        },
        updateAnswer({ commit, getters, dispatch }, newAnswer) {
            commit('setAnswer', newAnswer)
        },
        updateHints({ commit, getters, dispatch }, newHints) {
            commit('setHints', newHints)
        },
        updateTimer({ commit, getters, dispatch }, newTimer) {
            commit('setTimer', newTimer)
        },
        updateGameSettings({ commit, getters, dispatch }, newGameSettings) {
            commit('setGameSettings', newGameSettings)
        },
        updateGamePhase({ commit, getters, dispatch }, newGamePhase) {
            commit('setGamePhase', newGamePhase)
        },
        updatePlayersAnswers({ commit, getters, dispatch }, PlayersAnswers) {
            commit('setGamePlayersAnswers', PlayersAnswers)
            commit('updateLobbyPlayerScore', PlayersAnswers)
        },
    },
    mutations: {
        setQuestion(state, newQuestion) {
            state.question = newQuestion
        },
        setAnswer(state, newAnswer) {
            state.answer = newAnswer
        },
        setHints(state, newHints) {
            state.hints = newHints
        },
        setTimer(state, newTimer) {
            state.timer = newTimer
        },
        setGameSettings(state, gameSettings) {
            state.gameSettings = gameSettings
        },
        setGamePhase(state, gamePhase) {
            state.gamePhase = gamePhase
        },
        setGamePlayersAnswers(state, playersAnswers) {
            state.playersAnswers = playersAnswers
        }
    },
    state: {
        timer: 0,
        question: '',
        questionType: 'text',
        answer: '?',
        gameSettings: {},
        gamePhase: 'question',
        hints: [],
        playersAnswers: []
    },
    getters: {
        gameQuestion(state) {
            return state.question
        },
        gameAnswer(state) {
            return state.answer
        },
        gameHints(state) {
            return state.hints
        },
        gameQuestionType(state) {
            return state.questionType
        },
        gameTimer(state) {
            return state.timer
        },
        gameSettings(state) {
            return state.gameSettings
        },
        gamePhase(state) {
            return state.gamePhase
        },
        playersAnswers(state) {
            return state.playersAnswers
        },
    }
}