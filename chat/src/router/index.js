import Vue from 'vue'
import VueRouter from 'vue-router'
import websocket from '@/network/websocket'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/chat',
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "layout" */ '@/views/main/layout'),
    children: [
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "contacts" */ '@/views/main/childComs/contacts/contacts'),
      },
      {
        path: 'chat',
        name: 'chat',
        component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "chat" */ '@/views/main/childComs/chat/chat.vue'),
        children: [
          {
            path: 'toChat',
            name: 'toChat',
            component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "chatCom" */ '@/components/content/chatContainer/chatCom'),
          },
          {
            path: '/',
            name: 'background',
            component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "chatBackground" */ '@/views/main/childComs/chat/chatBackground'),
          }
        ]
      },
      {
        path: 'info',
        name: 'info',
        component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "info" */ '@/views/main/childComs/info/myInfo.vue'),
      },
      {
        path: 'discover',
        name: 'discover',
        component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "discover" */ '@/views/main/childComs/discover/index.vue'),
        children: [
          {
            path: '/',
            name: '',
            component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "moments" */ '@/views/main/childComs/discover/discover.vue'),
          },
          {
            path: 'moments',
            name: 'moments',
            component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "moments" */ '@/views/main/childComs/discover/moments/index.vue'),
          },
          {
            path: 'editMoment',
            name: 'moments',
            component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "editMoment" */ '@/views/main/childComs/discover/moments/editMoment.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "login" */ '@/views/login/login.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.token
    if (!token) {
      next('/login')
    } else if(from.path === '/login'){
      console.log('+++++++++++++++++');
      websocket()
      Vue.prototype.$socket.open()
      next()
    } else {
      console.log('_____________');
      if (!Vue.prototype.$socket || Vue.prototype.$socket.disconnected) {
        websocket()
        Vue.prototype.$socket.open()
      }
      next()
    }
  }
}) //这些代码写在router文件夹中的index.js下
export default router
