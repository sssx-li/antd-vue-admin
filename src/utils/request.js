import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

// message config
message.config({
  duration: 2,
  top: '40px',
  maxCount: 3
})

const service = axios.create({
  baseURL: 'http://localhost:3000', // url = base url + request url
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.message ? res.message : 'Error')
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Modal.warning({
          title: '你已退出登录，请重新登录',
          okText: '确认', // 设置按钮内容
          onOk: () => { // 点击确认后的回调
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
