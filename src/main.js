import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://127.0.0.1:5678/', { 
  store: store, 
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

vm.$connect()