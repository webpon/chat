import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前用户名
    username:'webpon',
    msgInfo: JSON.parse(localStorage.msgInfo || 'null') || null,
    myInfo: JSON.parse(localStorage.getItem('myInfo')),
    contacts:[]
  },
  mutations: {
    addMsg(state,item){
      if (state.msgInfo === null) {
        state.msgInfo = [item]
      } else {
        state.msgInfo.push(item)
      }
    },
    updateMyInfo(state,myInfo){
      console.log(myInfo);
      state.myInfo =myInfo
    },
    updateContacts(state,contacts){
      state.contacts = contacts
    }
  },
  actions: {
  },
  modules: {
  }
})
