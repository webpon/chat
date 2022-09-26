import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'animate.css'
import http from 'network/index'
import './network/websocket.js'
import alertWheel from './components/common/alertWheel/index'
import antd from 'ant-design-vue';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
import VuevideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import lazyLoad from '@/plugins/lazy-load';
Vue.use(lazyLoad)
Vue.prototype.$http = http //这样可以让axios在所有组件中使用
Vue.use(VueLazyload, {
  loading: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif',
  // 延迟显示，用于测试，实际开发不需要
  throttleWait: 1000,
  lazyComponent: true,
  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
Vue.use(VueLazyComponent)
Vue.use(Viewer)
Vue.use(VuevideoPlayer);
Vue.use(antd);
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.alertWheel = alertWheel
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
