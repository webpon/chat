import Vue from 'vue'
import { io } from 'socket.io-client'
import router from '@/router/index'
import store from '@/store/index'
let socket = null
export default () => {
  //设置io连接配置，并且连接
  // if(!localStorage.myInfo){
  // 39.103.233.82
  socket = io('http://39.103.233.82:5000',
  // socket = io('http://localhost:5000',
    {
      //禁止默认自动断开重连
      reconnection: false,
      autoConnect: false,
      query: {
        "token": localStorage.token,
        "userInfo": localStorage.myInfo
      }
    },
  );
  socket.open()
  //把socket对象与Vue的原型绑定，这样就可以在其他组件引用了
  Vue.prototype.$socket = socket
  try {
    //监听websocket连接成功
    socket.on('connect', () => {
      console.log('websocket连接成功')
      socket.emit('getOnlineUserInfo')
    })
    socket.io.on("error", () => {
      console.log('websocket连接失败')
      Vue.prototype.$message.error('登录失效了, 请重新登录')
      router.replace('/login')
    });
    //监听websocket断开
    socket.on('disconnect', () => {
      console.log('websocket断开连接')
      // 如果token存在，重新连接websocket
      if (localStorage.token && router.app && router.app.$route.path !== '/login') {
        let reconnect = setInterval(() => {
          socket.open()
          console.log('正在尝试重新连接')
          if (socket.connected) {
            console.log('重新连接成功');
            clearInterval(reconnect)
          }
        }, 8000);
      }
    })

    //监听消息
    socket.on('emitEvent', (data) => {
      console.log('接收到信息');
      console.log(data);
      let imgSrc
      if (data.to === '群聊') {
        Vue.prototype.$message.info(data.from + '向群聊发送了一条消息')
      } else {
        Vue.prototype.$message.info(data.from + '向你发来一条消息')
        console.log(store.state.contacts);
        store.state.contacts.forEach(item => {
          if (item.username === data.from) {
            imgSrc = item.imgSrc
          }
        });
        store.commit('updateChatList', {
          username: data.from,
          imgSrc: imgSrc
        })
      }
      store.commit('addMsg', data)
    })

    //获取在线用户列表
    socket.on('sendList', (data) => {
      console.log(data);
      const { onlineUser = [], changeUser = false } = data || {}
      console.log(changeUser);
      store.commit('updateContacts', onlineUser)
      if (!changeUser) return
      if (changeUser && changeUser.isOnline) {
        Vue.prototype.$message.info(`${changeUser.username}登陆了`)
      } else {
        Vue.prototype.$message.info(`${changeUser.username}退出了`)
      }
    })
    console.log('APPmounted');
  } catch (error) {
    console.log(error);
  }

}