<template>
  <div>
    <div class="messageWarpper">
      <img class="_avater" :src="imgSrc" alt="" v-viewer />
      <span class="left-wraper">
        <span class="nick" :style="{color: isOnline ? 'blue' : 'gray'}">{{sendmsg.from}} {{isOnline ? '(在线)':
        '(离线)'}}</span>
        <div v-if="sendmsg.type === 'video'" class="video">
          <lazy-component @show="lazyLoadVideo">
            <img v-if="!loadVideo" style="width: 180px; height: 180px;position: absolute;"
              src="https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif" />
            <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
              :options="{width: 180, height: 180, sources: [{src: sendmsg.msg}]}" style="width: 100%;height: 100%" />
          </lazy-component>
        </div>
        <span v-viewer v-else-if="/http|https/.test(sendmsg.msg) || sendmsg.type === 'picture'">
          <img v-lazy="sendmsg.msg" class="img" />
        </span>
        <p class="msgCard" v-else  @contextmenu.prevent.stop="sCopy">{{ sendmsg.msg }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import rightClick from "../../rightClick";
export default {
  data() {
    return {
      loadVideo: false,
    }
  },
  components:{rightClick},
  props: {
    sendmsg: {
      type: Object,
      default: {},
    },
  },
  computed: {
    imgSrc() {
      return this.sendmsg.from_avater || 'https://img0.baidu.com/it/u=373651998,3173795795&fm=253&fmt=auto&app=138&f=JPEG?w=150&h=150'
    },
    isOnline() {
      let flag = false
      this.$store.state.contacts.forEach(item => {
        if (item.username === this.sendmsg.from) {
          flag = true
        }
      });
      return flag
    }
  },
  methods: {
    lazyLoadVideo() {
      setTimeout(() => {
        this.loadVideo = true
      }, 150)
    },
    // 播放回调
    onPlayerPlay() {
      const beforePlayer = this.$store.state.playingVideo
      if (beforePlayer && beforePlayer !== this.$refs.videoPlayer.player) {
        beforePlayer.pause()
      }
      this.$store.commit('updatePlayingVideo', this.$refs.videoPlayer.player)
    },
    sCopy({x,y}){
      this.$store.commit("showRightClick", true)
      this.$store.commit("updateRightClickAxis", {x,y})
      this.$store.commit("updateRightClickEvent", {
        type: 'msgItem',
        copy: this.copy
      })
      const copy = e => {
        this.$store.commit("showRightClick", false)
        document.removeEventListener("click", copy)
      }
      document.addEventListener('click',copy)

    },
    copy(){
      var textareaC = document.createElement('textarea');
      textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
      textareaC.value = this.sendmsg.msg;
      document.body.appendChild(textareaC); //将textarea添加为body子元素
      textareaC.select();
      var res = document.execCommand('copy');
      document.body.removeChild(textareaC);//移除DOM元素
      return res;
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .messageWarpper {
    padding: 0 25px;
  }
}

@media screen and (max-width: 750px) {
  .messageWarpper {
    padding: 0 5px;
  }
}

.messageWarpper {
  position: relative;
  float: left;
  display: flex;
  margin: 10px 0;

  .img {
    width: 150px;
    height: 150px;
  }

  .video {
    width: 180px;
    height: 180px;

    ::v-deep {
      #vjs_video_3 {
        width: 100%;
        height: 180px;
      }
    }
  }


  .left-wraper {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
}

.nick {
  font-size: 10px;
  font-weight: bold;
  line-height: 20px;
}

.messageWarpper img {
  width: 45px;
  height: 45px;
}

.msgCard {
  display: inline-block;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  word-break: break-all;
  max-width: 180px;
  border-radius: 5px;
}
.cp{
  position: fixed;
  z-index: 999;
  border: 1px black solid;
  button {
    display: block;
    border: none;
    background-color: #ffffff;
    color: #000000;
    width: 50px;
    height: 20px;
  }
  button:hover{
    background-color: rgba(104, 91, 91, 0.73);
  }
}


</style>
