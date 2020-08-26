import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
