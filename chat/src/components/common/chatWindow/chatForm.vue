<template>
  <div class="chatForm">
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
      }
      //本地添加
      this.$store.commit('addMsg', {
        from: JSON.parse(localStorage.myInfo).username,
        from_avater: JSON.parse(localStorage.myInfo).imgSrc,
        to: this.$route.query.userName,
        msg: this.message.content,
        type: this.message.type
      })
      //向要发送的客户端添加
      this.$socket.emit('sendEvent', {
        from: JSON.parse(localStorage.myInfo).username,
        from_avater: JSON.parse(localStorage.myInfo).imgSrc,
        to: this.$route.query.userName,
        msg: this.message.content,
        type: this.message.type,
      })
      this.message.content = ''
      this.message.type = 'string'

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
      if (!file) return
      const fileMaxSize = 1024 * 1024 * 20
      if (file.size > fileMaxSize) {
        this.$message.error('最高支持20MB大小')
        return
      }
      let form = new FormData(); // FormData 对象
      form.append("file", file); // 文件对象
      const config = {
        onUploadProgress: progressEvent => {
          let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
          this.progress = persent
        },
      }
      const url = await this.$http.post('http://39.103.233.82:13141/upload', form, config)
      this.message.type = type
      this.message.content = url.data.fileName
      this.sendmsg()
      e.target.value = ''
      this.progress = 0
    },
  },
}
</script>
<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .sendBtn {
    right: 120px;
    bottom: 30px;
  }
  .length-info {
    right: 50px;
  }
}

@media screen and (max-width: 750px) {
  .sendBtn {
    right: 20px;
    bottom: 20px;
  }
  .length-info {
    right: 22px;
  }
}

.chatForm {
  position: fixed;
  background-color: #fff !important;
  padding: 10px 0 ;
  bottom: 0;
  height: 190px;
  width: 100%;
  border: 1px rgb(217,217,217) solid;

  .length-info {
    color: darkblue;
  }
  .upload {
    margin-left: 15px;
  }
}
.sendBtn {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
.chatForm .sendAndLength {
  height: 40px !important;
  background-color: #fff !important;
  padding: 10px;
  border: none;
  margin: 0;
}
</style>
