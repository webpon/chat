import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'animate.css'
import { http, moments, oss } from 'network/index'
import socket from './network/websocket.js'
import alertWheel from './components/common/alertWheel/index'
import antd from 'ant-design-vue';
import Vant from 'vant';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
import VuevideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import '@/styles/markdown.scss'
// 处理vant组件库PC兼容问题
import '@vant/touch-emulator';

import commonMixin from '@/mixins/common.js';

Vue.prototype.$http = http //这样可以让axios在所有组件中使用
Vue.prototype.$moments = moments //这样可以让axios在所有组件中使用
Vue.prototype.$oss = oss //这样可以让axios在所有组件中使用

Vue.mixin(commonMixin);

Vue.use(VueLazyload, {
  loading: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif',
  lazyComponent: true,
  // set observer to true
  observer: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
Vue.use(Viewer)
Vue.use(VuevideoPlayer);
Vue.use(antd);
Vue.use(Vant);
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.alertWheel = alertWheel
Vue.prototype.socketIInit = socket
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
