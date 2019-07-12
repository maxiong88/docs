import Vue from 'vue'
import axios from './axios.js'

import App from './App.vue'
// import router from './router'
// import store from './store'

import './directives/inf-scroll.js'
Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')
