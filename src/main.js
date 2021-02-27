import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {store} from './store/store'
import VueRouter from 'vue-router'
import {routes} from './routes.js'

Vue.use(VueRouter)
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)

Vue.config.productionTip = false
 const router = new VueRouter ({
   routes,
   mode: 'history'
 })

new Vue({
  vuetify,
  store,
  
  render: h => h(App),
  router

}).$mount('#app')
