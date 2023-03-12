import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NavTabs from "@/components/NavTabs"
import '@/assets/application.css'

Vue.component('NavTabs', NavTabs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
