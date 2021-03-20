import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import http from 'network/index'
import './network/websocket.js'
import alertWheel from './components/common/alertWheel/index'
Vue.prototype.$http = http //这样可以让axios在所有组件中使用
Vue.use(Antd);
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.alertWheel = alertWheel
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
