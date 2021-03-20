<template>
  <div id="chatBodytainer">
    <div class="chatBody" id="chatRecord">   
        <div v-for="(item,index) in currentMsgInfo" :key="index" > 
               <msg :msg="item"/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import messageItem from './messageItem'
import sendmessage from './sendmessage'
import msg from "./msg"
export default {
  name: 'chatBody',
  data() {
    return {
      // msgInfo: JSON.parse(localStorage.getItem('msgInfo')),
    }
  },
  components: { messageItem, sendmessage,msg },
  computed: {
    msgInfo(){
      return this.$store.state.msgInfo
    },
    currentMsgInfo(){
      let arr = []
       if (this.$store.state.msgInfo !== null) {
        this.$store.state.msgInfo.forEach((item) => {
         if(item.to === '群聊' && item.to === this.$route.query.userName){
           arr.push(item)
         }else if(
            item.from === JSON.parse(localStorage.myInfo).username &&
            item.to === this.$route.query.userName 
            || item.from === this.$route.query.userName
            && item.to === JSON.parse(localStorage.myInfo).username
          ) {
            arr.push(item)
          }
        })
        console.log(arr);
        return arr
      }
    },
    session() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
  },
  watch: {
    msgInfo(newValue, oldValue) {
      localStorage.setItem('msgInfo', JSON.stringify(newValue))
      setTimeout(() => {
        let chatBody = document.querySelector('.chatBody')
        chatBody.scrollTo(0, chatBody.scrollHeight)
      }, 50)
    },
  },
  updated() {
    // let ele = document.getElementById('chatRecord')
    // document.querySelector('#chatBodytainer').scrollTop = ele.scrollHeight
  },
}
</script>

<style scoped>
#chatBodytainer {
  margin-top: 65px;
}
.chatBody {
  height: calc(100vh - 230px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.chatBody {
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 0.7rem;
  font-family: '\5FAE\8F6F\96C5\9ED1', Helvetica, '黑体', Arial, Tahoma;
}
/*滚动条样式*/
.chatBody::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  display: none;
}
.chatBody::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  height: 4px;
}
.chatBody::-webkit-scrollbar-track {
  -weblist_warperkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  height: 4px;
}
</style>
