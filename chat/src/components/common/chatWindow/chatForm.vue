<template>
  <div class="chatForm">
    <a-textarea
      placeholder="请输入内容"
      :rows="4"
      v-model.trim="message"
      @pressEnter.prevent="sendmsg"
    />
    <a-button @click="sendmsg" class="sendBtn">发送</a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      msgRecords: [],
    }
  },
  methods: {
    //向发送请求的客户端添加聊天记录
    sendmsg() {
      var _this = this
      if (this.message == '') {
        return
      } else {
        //本地添加
        this.$store.commit('addMsg', {
          from: JSON.parse(localStorage.myInfo).username,
          to: this.$route.query.userName,
          msg: this.message,
        })
        console.log(this.$store.state.msgInfo);
        //向要发送的客户端添加
        this.$socket.emit('sendEvent', {
          from: JSON.parse(localStorage.myInfo).username,
          to: this.$route.query.userName,
          msg: this.message,
        })
        this.message = ''
      }
    },
  },
  mounted() {
   
  },
}
</script>
<style scoped>
.chatForm {
  position: fixed;
  bottom: 0;
  height: 170px;
  width: 100%;
}
.sendBtn {
  position: fixed;
  right: 70px;
  bottom: 10px;
}
</style>
<style>
.chatForm .ant-input {
  height: 170px !important;
  background-color: #fff !important;
  padding: 10px;
  margin: 0;
}
</style>
