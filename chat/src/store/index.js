import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'webpon',
    msgInfo: JSON.parse(localStorage.msgInfo || 'null') || null,
    myInfo: JSON.parse(localStorage.getItem('myInfo'))
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
    }
  },
  actions: {
  },
  modules: {
  }
})
