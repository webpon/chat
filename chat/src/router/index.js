import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/main/layout"
import login from '../views/login/login.vue'
import contacts from '@/views/main/childComs/contacts/contacts'
import chat from '@/views/main/childComs/chat/chat.vue'
import chatCom from '@/components/content/chatContainer/chatCom'
import chatBackground from '@/views/main/childComs/chat/chatBackground'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/chat',
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'contacts',
        name: 'contacts',
        component: contacts
      },
      {
        path: 'chat',
        name: 'chat',
        component: chat,
        children:[
          {
            path: 'toChat',
            name: 'toChat',
            component: chatCom
          },
          {
            path: '',
            name: 'background',
            component: chatBackground
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: login,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.token
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
}) //这些代码写在router文件夹中的index.js下
export default router
