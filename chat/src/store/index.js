import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前用户名
    username: 'webpon',
    msgInfo: JSON.parse(localStorage.msgInfo || 'null') || null,
    myInfo: JSON.parse(localStorage.getItem('myInfo')),
    contacts: [],
    chatList: [
      {
        username: '智能客服',
        msg: '欢迎反馈bug',
        imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/1.jpg',
      },
      {
        username: '群聊',
        msg: '在这里可以收到所有人的信息',
        imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/4.jpg',
      },
    ],
    playingVideo: null,
    isMobile: false
  },
  mutations: {
    addMsg(state, data) {
      if (state.msgInfo === null || !Array.isArray(state.msgInfo)) {
        state.msgInfo = [data]
      } else if (state.msgInfo.length > 1000) {
        state.msgInfo = state.msgInfo.slice(state.msgInfo.length - 490)
        state.msgInfo.push(data)
      } else if (state.msgInfo.length > 500) {
        state.msgInfo.shift()
        state.msgInfo.push(data)
      } else {
        state.msgInfo.push(data)
      }
      localStorage.setItem('msgInfo', JSON.stringify(state.msgInfo))
    },
    updateMyInfo(state, myInfo) {
      state.myInfo = myInfo
    },
    updateContacts(state, contacts) {
      state.contacts = contacts
    },
    updateChatList(state, chatUser) {
      if (state.chatList.some(item => item.username === chatUser.username)) {
        return
      } else {
        state.chatList.push(chatUser)
      }
    },
    checkDevice(state, isMobile) {
      state.isMobile = isMobile
    },
    updatePlayingVideo(state, videoRef) {
      state.playingVideo = videoRef
    }
  }, 
  actions: {
  },
  modules: {
  }
})
