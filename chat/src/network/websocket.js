﻿import Vue from 'vue'
import { io } from 'socket.io-client'
import router from '@/router/index'
import store from '@/store/index'
const audio = new Audio()
let socket = null
const IS_PROD = process.env.NODE_ENV === "production";
const IS_SVR = process.env.VUE_APP_PROJECT_ENV === 'svr'
const baseURL = (IS_PROD || IS_SVR) ? 'http://39.103.233.82:14399' : 'http://localhost:14399'
export default () => {
  //设置io连接配置，并且连接
  socket = io(baseURL,
    {
      //禁止默认自动断开重连
      reconnection: false,
      autoConnect: false,
      query: {
        "token": localStorage.token,
        "userInfo": JSON.stringify(store.state.myInfo)
      }
    },
  );
  //把socket对象与Vue的原型绑定，这样就可以在其他组件引用了
  Vue.prototype.$socket = socket
  try {
    //监听websocket连接成功
    socket.on('connect', () => {
      socket.emit('getOnlineUserInfo')
    })
    socket.io.on("error", () => {
      Vue.prototype.$message.error('登录失效了, 请重新登录')
      router.replace('/login')
    });
    //监听websocket断开
    socket.on('disconnect', () => {
      // 如果token存在，重新连接websocket
      setTimeout(() => {
        const isReconnect = localStorage.token && router.currentRoute.path !== '/login'
        if (isReconnect) {
          let reconnect = setInterval(() => {
            socket.open()
            if (socket.connected) {
              clearInterval(reconnect)
            }
            if (!isReconnect) {
              clearInterval(reconnect)
            }
          }, 8000);
        }
      }, 1000)
    })

    //监听消息
    socket.on('emitEvent', (data) => {
      function msgToAudio(data) {
        if (window.SpeechSynthesisUtterance) {
          let msg = new SpeechSynthesisUtterance();
          switch (data.type) {
            case "picture":
              msg.text = data.to + '发来一张图片'
              break;
            case "video":
              msg.text = data.to + '发来一个视频'
              break;
            default:
              msg.text = (data.to === '群聊' ? '群聊' : data.from) + '发来一条信息'; // 待合成文字
              break;
          }
          msg.rate = 1;  // 播放倍速
          msg.volume = 1; // 音量
          speechSynthesis.speak(msg);
        } else {
          audio.src = "https://webpon-img.oss-cn-guangzhou.aliyuncs.com/msg.mp3"
          audio.play();
        }
      }
      msgToAudio(data)
      // 群聊不需弹窗提醒
      const obj = {
        username: data.from,
        imgSrc: data.to !== '群聊' ? data.from_avater : 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/4.jpg',
        msg: data.msg,
        time: data.time
      }
      if (data.to !== '群聊') {
        store.commit('updateMsgHint', {
          show: true,
          ...obj
        })
      } else {
        obj.username = '群聊'
      }
      store.commit('updateChatList', {
        msgNumber: 1,
        ...obj
      })
      store.commit('addMsg', data)
    })

    //获取在线用户列表
    socket.on('sendList', (data) => {
      const { onlineUser = [] } = data || {}
      store.commit('updateContacts', onlineUser)
    })
  } catch (error) {
    console.log(error);
  }

}