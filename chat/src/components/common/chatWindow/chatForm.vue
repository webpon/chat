<template>
  <div class="chatForm">
    <a-textarea placeholder="请输入内容" @input="areaInput" :rows="4" v-model.trim="message.content"
      @pressEnter.prevent="sendmsg" />
    <div class="upload">
      <a-icon type="picture" @click="uploadImg" :style="{ fontSize: '20px', color: '#08c' }" />
      <a-icon type="play-square" @click="uploadVideo"
        :style="{ fontSize: '20px', color: '#08c', 'margin': '0 20px' }" />
      <progress :value="progress" max="100" style="width: 65px"></progress>
      {{ progress }} %
      <input v-show="false" accept="image/*" ref="fileInputPicture" type="file"
        @change="uploadProgress($event, 'picture')" />
      <input v-show="false" accept="video/*" ref="fileInputVideo" type="file"
        @change="uploadProgress($event, 'video')" />
    </div>
    <a-button @click="sendmsg" class="sendBtn">发送</a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: {
        type: "string",
        content: ''
      },
      msgRecords: [],
      progress: 0
    }
  },
  methods: {
    //向发送请求的客户端添加聊天记录
    sendmsg() {
      if (this.message.content === '') {
        return
      } else {
        //本地添加
        this.$store.commit('addMsg', {
          from: JSON.parse(localStorage.myInfo).username,
          to: this.$route.query.userName,
          msg: this.message.content,
          type: this.message.type
        })
        //向要发送的客户端添加
        this.$socket.emit('sendEvent', {
          from: JSON.parse(localStorage.myInfo).username,
          to: this.$route.query.userName,
          msg: this.message.content,
          type: this.message.type,
        })
        this.message.content = ''
        this.message.type = 'string'
      }
    },
    areaInput() {
      this.message.type = "string"
    },
    uploadImg() {
      this.$refs.fileInputPicture.click()
    },
    uploadVideo() {
      this.$refs.fileInputVideo.click()
    },
    async uploadProgress(e, type) {
      var file = e.target.files[0]; // js 获取文件对象
      console.log(file);
      if (!file) return
      const fileMaxSize = 1024 * 1024 * 20
      if (file.size > fileMaxSize) {
        this.$message.error('最高支持20MB大小')
        return
      }
      var form = new FormData(); // FormData 对象
      form.append("file", file); // 文件对象
      const config = {
        onUploadProgress: progressEvent => {
          let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
          this.progress = persent
          if (persent === 100) {
            this.progress = 0
          }
        },
      }
      const url = await this.$http.post('http://39.103.233.82:13141/upload', form, config)
      this.message.type = type
      this.message.content = url.data.fileName
    },
  },
}
</script>
<style scoped lang="scss">
.chatForm {
  position: fixed;
  bottom: 0;
  height: 170px;
  width: 100%;

  .upload {
    position: absolute;
    bottom: 25px;
    left: 15px;
  }
}

.sendBtn {
  position: fixed;
  right: 40px;
  bottom: 20px;
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
