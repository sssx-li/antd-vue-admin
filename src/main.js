import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入所有样式
import Antd from 'ant-design-vue' // 引入antd
import 'ant-design-vue/dist/antd.less'
import './styles/antd-vue.less'
import './styles/variable-theme.less'
import i18n from './lang'// i18n

// icon
import '@/icons'

Vue.use(Antd)

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
  i18n,
  render: h => h(App)
}).$mount('#app')
