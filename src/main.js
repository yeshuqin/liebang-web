import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'
import http from '@/utils/request'
import api from '@/utils/api'
import { getToken } from '@/utils/auth'

Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.config.productionTip = false;
console.log(store, 'mian.js')
/**
 * //验证手机号码
 */
Vue.prototype.isPhoneNumber = (phoneNumber) => {
  if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
    return false
  }
  return true
}

let whiteList = ['/login']
router.beforeEach(async(to, from, next) => {

  const hasToken = getToken()
  console.log(hasToken, 'hasToken==')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
