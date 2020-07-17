import Vue from 'vue'
import Vuex from 'vuex'
console.log(Vuex, 'Vuex===')
import getters from './getters'
import user from './modules/user'
console.log(getters, 'getters===')
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

console.log(store, 'store--22')

export default store
