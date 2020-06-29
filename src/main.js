import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'

Vue.use(ElementUI)
Vue.config.productionTip = false;

/**
 * //验证手机号码
 */
Vue.prototype.isPhoneNumber = (phoneNumber) => {
  if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
    return false
  }
  return true
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
