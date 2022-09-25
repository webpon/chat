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

Vue.prototype.$http = http //这样可以让axios在所有组件中使用
Vue.use(VueLazyload, {
  loading: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.grovehousecamberwell.co.uk%2Fimg%2Fspinner-big.gif&refer=http%3A%2F%2Fwww.grovehousecamberwell.co.uk&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666627924&t=5e5ec1150c1c49397c7afc3d07e47ab4',
  // 延迟显示，用于测试，实际开发不需要
  throttleWait: 0
})
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
