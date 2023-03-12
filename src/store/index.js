import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from '@/store/user'
import restaurants from '@/store/restaurants'

export default new Vuex.Store({
  //實現vuex倉庫模塊開發存儲數據
  modules: {
    user,
    restaurants
  }
})
