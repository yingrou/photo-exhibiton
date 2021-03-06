// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueX from 'vue'
import VueCookies from 'vue-cookies'

// Vue.use(VueX)
Vue.use(VueCookies)
Vue.use(ElementUI);

import './themes/minireset.css'
import './themes/common.css'
import './icon/iconfont'
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
