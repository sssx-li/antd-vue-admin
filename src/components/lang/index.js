import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocal from './en-ui'
import zhLocal from './zh-cn'
import Cookies from 'js-cookie'

import store from '@/store'
Vue.use(VueI18n)

const messages = {
  'en': {
    ...enLocal
  },
  'zh-cn': {
    ...zhLocal
  }
}

store.commit('user/SET_LANGUAGE', Cookies.get('antd-vue-language') || null)

const i18n = new VueI18n({
  locale: Cookies.get('antd-vue-language') || 'en', // 默认为英文
  silentFallbackWarn: true, // 取消本地化失败时的输出警告
  silentTranslationWarn: true, // 隐藏警告信息
  messages
})

export default i18n
