<template>
  <div id="chatBodytainer">
    <div class="chatBody" ref="chatBody" id="chatRecord">
      <a-icon type="loading" v-show="loadingMsg" style="padding: 10px 0" />
      <div v-for="item in currentMsgInfo" :key="item.msgId">
        <msg :msg="item" />
      </div>
    </div>
  </div>
</template>

<script>
import msg from "./msg"
export default {
  name: 'chatBody',
  data() {
    return {
      windowInnerHeight: window.innerHeight,
      loadingMsg: false,
      loadTimer: null,
      currentMsgInfo: [],
      lastMsgInfoIndex: 0
    }
  },
  components: { msg },
  computed: {
    msgInfo() {
      return this.$store.state.msgInfo
    },
    session() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
  },
  mounted() {
    this.initMsgList()
    this.$refs.chatBody.style.height = `calc(${this.windowInnerHeight}px - 205px)`
    this.$nextTick(() => {
      this.$refs.chatBody.scrollTo(0, this.$refs.chatBody.scrollHeight)
    })
  },
  watch: {
    msgInfo: {
      handler() {
        const newMsg = this.msgInfo[this.msgInfo.length - 1]
        if (newMsg.to === '群聊' && newMsg.to === this.$route.query.userName) {
          this.currentMsgInfo.push(newMsg)
        } else if (
          newMsg.from === JSON.parse(localStorage.myInfo).username &&
          newMsg.to === this.$route.query.userName
          || newMsg.from === this.$route.query.userName
          && newMsg.to === JSON.parse(localStorage.myInfo).username
        ) {
          this.currentMsgInfo.push(newMsg)
        }
        this.$nextTick(() => {
          this.$refs.chatBody.scrollTo(0, this.$refs.chatBody.scrollHeight)
        })
      },
    },
    '$route.query': function () {
      this.initMsgList()
      this.$nextTick(() => {
        this.$refs.chatBody.scrollTo(0, this.$refs.chatBody.scrollHeight)
      })
    }
  },
  methods: {
    initMsgList() {
      this.$refs.chatBody.addEventListener('scroll', this.checkIsTop)
      this.currentMsgInfo = []
      const arr = []
      let index
      if (this.$store.state.msgInfo !== null && this.$route.path === '/chat/toChat') {
        const msgInfo = this.$store.state.msgInfo
        const msgInfoLength = msgInfo.length
        for (index = msgInfoLength - 1; index > 0; index--) {
          const item = this.$store.state.msgInfo[index];
          if (item.to === '群聊' && item.to === this.$route.query.userName) {
            if (!item.msgId) {
              item.msgId = Math.random().toString() + new Date().valueOf()
            }
            arr.unshift(item)
          } else if (
            item.from === JSON.parse(localStorage.myInfo).username &&
            item.to === this.$route.query.userName
            || item.from === this.$route.query.userName
            && item.to === JSON.parse(localStorage.myInfo).username
          ) {
            if (!item.msgId) {
              item.msgId = Math.random().toString() + new Date().valueOf()
            }
            arr.unshift(item)
          }
          if (arr.length >= 12) {
            break;
          }
        }
        this.lastMsgInfoIndex = index
        this.currentMsgInfo = arr
      }
    },
    checkIsTop() {
      clearTimeout(this.loadTimer)
      this.loadTimer = setTimeout(() => {
        if (this.$refs.chatBody.scrollTop < 20) {
          this.loadingMsg = true
          this.loadMsg()
        }
      }, 300)
    },
    loadMsg() {
      if (this.lastMsgInfoIndex <= 0) {
        this.loadingMsg = false
        this.$refs.chatBody.removeEventListener('scroll', this.checkIsTop)
        return
      }
      const msgInfo = this.$store.state.msgInfo
      const arr = []
      let index
      for (index = this.lastMsgInfoIndex - 1; index >= 0; index--) {
        const item = msgInfo[index];
        if (item.to === '群聊' && item.to === this.$route.query.userName) {
          if (!item.msgId) {
            item.msgId = Math.random().toString() + new Date().valueOf()
          }
          arr.unshift(item)
        } else if (
          item.from === JSON.parse(localStorage.myInfo).username &&
          item.to === this.$route.query.userName
          || item.from === this.$route.query.userName
          && item.to === JSON.parse(localStorage.myInfo).username
        ) {
          if (!item.msgId) {
            item.msgId = Math.random().toString() + new Date().valueOf()
          }
          arr.unshift(item)
        }
        if (arr.length >= 12) {
          break;
        }
      }
      this.lastMsgInfoIndex = index
      const beforeHeight = this.$refs.chatBody.scrollHeight
      setTimeout(() => {
        this.loadingMsg = false
        this.currentMsgInfo.unshift(...arr)
        this.$nextTick(() => {
          this.$refs.chatBody.scrollTo(0, this.$refs.chatBody.scrollHeight - beforeHeight)
        })
      }, 500)
    }
  },
  beforeDestroy() {
    this.$refs.chatBody.removeEventListener('scroll', this.checkIsTop)
  }
}
</script>

<style scoped>
#chatBodytainer {
  margin-top: 65px;
}

.chatBody {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
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
  background: rgba(0, 0, 0, 0.2);
  height: 4px;
}

.chatBody::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  height: 4px;
}
</style>
