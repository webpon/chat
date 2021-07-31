import Vue from 'vue'
import { io } from 'socket.io-client'
//设置io连接配置，并且连接
let socket = null

// if(!localStorage.myInfo){
  // 106.52.44.186
socket = io('http://39.103.233.82:5000',
  {
    //禁止默认自动断开重连
    reconnection: false,
    autoConnect: false
  }
);
// }
//把socket对象与Vue的原型绑定，这样就可以在其他组件引用了
Vue.prototype.$socket = socket
try {
  //监听websocket连接成功
  socket.on('connect', () => {
    console.log('websocket连接成功')
    //向服务器注册个人信息
    socket.emit('set', localStorage.myInfo)
    console.log('重新注册');
  })
  //监听websocket断开
  socket.on('disconnect', () => {
    console.log('websocket断开连接')
    // 如果token存在，重新连接websocket
    if (localStorage.token) {
    let reconnect = setInterval(() => {
       socket.open()
       console.log('正在尝试重新连接')
       if (socket.connected){
         console.log('重新连接成功');
         clearInterval(reconnect)
       }
     }, 5000);
    }
  })
} catch (error) {
  console.log('websocket还没连接')
}
