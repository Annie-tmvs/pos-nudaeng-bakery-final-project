import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueQRCodeComponent from 'vue-qrcode-component'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "font-awesome/css/font-awesome.min.css";
import './axios'

Vue.config.productionTip = false
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
Vue.component('qr-code', VueQRCodeComponent)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": true,
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

// router.replace('/login')