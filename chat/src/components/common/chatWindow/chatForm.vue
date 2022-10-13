<template>
  <div class="chatForm">
      <div class="upload">
      <a-icon type="picture" @click="uploadImg" :style="{ fontSize: '20px', color: '#08c' }" />
      <a-icon type="play-square" @click="uploadVideo"
        :style="{ fontSize: '20px', color: '#08c', 'margin': '0 20px' }" />
      <progress :value="progress" max="100" style="width: 150px"></progress>
      {{ progress }} %
      <input v-show="false" accept="image/*" ref="fileInputPicture" type="file" :multiple="false"
        @change="uploadProgress($event, 'picture')" />
      <input v-show="false" accept="video/*" ref="fileInputVideo" type="file" :multiple="false"
        @change="uploadProgress($event, 'video')" />
    </div>
    <a-textarea class="msg_textarea" :maxLength="200" placeholder="请输入内容" @input="areaInput" :rows="4"
      v-model.trim="message.content" @pressEnter.prevent="sendmsg" @contextmenu.prevent.stop="sCopy"
      ref="input"
    />
    <span class="length-info">
      {{ message.content.length }} / 200
    </span>
    <a-button @click="sendmsg" class="sendBtn">发送</a-button>
  </div>
</template>
<script>
import rightClick from "../../rightClick";

export default {
  data() {
    return {
      message: {
        type: "string",
        content: ''
      },
      msgRecords: [],
      progress: 0,
      axis:{
        x:100,
        y:100
      },
      showCopy: false
    }
  },
  components:{rightClick},
  methods: {
    //向发送请求的客户端添加聊天记录
    sendmsg() {
      if (this.message.content === '') {
        return
      }
      //本地添加
      this.$store.commit('addMsg', {
        from: this.$store.state.myInfo.username,
        from_avater: this.$store.state.myInfo.imgSrc,
        to: this.$route.query.userName,
        msg: this.message.content,
        type: this.message.type,
        time: new Date().getTime()
      })
      //向要发送的客户端添加
      this.$socket.emit('sendEvent', {
        from: JSON.parse(localStorage.myInfo).username,
        from_avater: JSON.parse(localStorage.myInfo).imgSrc,
        to: this.$route.query.userName,
        msg: this.message.content,
        type: this.message.type,
        msgId: Math.random().toString() + new Date().valueOf()
      })
      this.message.type = 'string'
      this.$store.commit("updateMsgItemMsg",{
        username:this.$route.query.userName,
        msg: this.message.content,
        time: new Date().getTime()
      })
      this.message.content = ''
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
      const fileMaxSize = 1024 * 1024 * 1000
      if (file.size > fileMaxSize) {
        this.$message.error('最高支持1000MB大小')
        return
      }
      let form = new FormData(); // FormData 对象
      const config = {
        onUploadProgress: progressEvent => {
          let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
          this.progress = persent
        },
      }
      // 请求签前面
      this.$oss.get("/").then(async ({data}) => {
          const key = data.dir + ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
              .replace(/[xy]/g, c => {
                      return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
              })) + `_${file.name}`
          form.append("policy", data.policy)
          form.append("signature", data.signature)
          form.append("OSSAccessKeyId",data.accessid)
          form.append("key", key);
          form.append("dir",data.dir)
          form.append("host",data.host)
          form.append("file", file); // 文件对象
          await this.$http.post(data.host, form, config)
          this.message.type = type
          this.message.content = data.host + "/" + key
          this.sendmsg()
          e.target.value = ''
          this.progress = 0
      })
    },
    sCopy({x,y}){
      this.$store.commit("showRightClick", {b:true, axis:{x, y}})
      this.$store.commit("addRightClickEvent", [
          {
              text: '复制',
              event: this.copy,
              show:true
          },
          {
              text: '粘贴',
              event: this.paste,
              show:true
          },
      ])
      const copy = e => {
          this.$store.commit("showRightClick", false)
          this.showCopy = false
        document.removeEventListener("click", copy)
      }
      document.addEventListener('click',copy)

    },
    copy(){
      var textareaC = document.createElement('textarea');
      textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
      textareaC.value = this.message.content;
      document.body.appendChild(textareaC); //将textarea添加为body子元素
      textareaC.select();
      var res = document.execCommand('copy');
      document.body.removeChild(textareaC);//移除DOM元素
      return res;
    },
    paste(){
      var clipPromise = navigator.clipboard.readText();
      clipPromise.then((clipText)=>{
        this.message.content += clipText
      })
    }

  },
  watch: {
      "$route.query.userName":{
          handler(){
              this.$refs.input.focus()
          },
          // immediate:true
      }
  }
}
</script>
<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .sendBtn {
    right: 50px;
    bottom: 20px;
  }

  .length-info {
    position: absolute;
    right: 50px;
    top: 15px;
  }
}

@media screen and (max-width: 750px) {
  .sendBtn {
    right: 20px;
    bottom: 20px;
  }

  .length-info {
    position: absolute;
    right: 22px;
    top: 12px;
  }
}

.chatForm {
  position: absolute;
  background-color: #fff !important;
  padding: 10px 0;
  bottom: 0;
  height: 140px;
  width: 100%;
  border: 1px rgb(217, 217, 217) solid;

  .msg_textarea {
    resize: none;
  }

  .length-info {
    color: darkblue;
  }

  .upload {
    margin-left: 15px;
  }

  .ant-input {
    border: none;
  }
  .ant-input:focus {
    box-shadow: none !important;
  }
}
.sendBtn {
  position: fixed;
}
</style>
  