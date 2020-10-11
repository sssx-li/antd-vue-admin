import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// icon
import '@/icons'

Vue.config.productionTip = false
// permission
import '@/permission' // permission control
// mock
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
