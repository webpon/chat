<template>
  <div>
    <rightClick :axis="axis" :show="showCopy">
      <button @click="copy">复制</button>
    </rightClick>

    <div class="messageWarpper" v-if="sendmsg !== null">
      <div>

        <div>
          <div v-if="sendmsg.type === 'video'" class="video">
            <lazy-component @show="lazyLoadVideo">
              <img v-if="!loadVideo" style="width: 180px; height: 180px;position: absolute;"
                src="https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif" class="_img-scale"/>
              <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
                :options="{width: 180, height: 180, sources: [{src: sendmsg.msg}]}" style="width: 100%;height: 100%" />
            </lazy-component>
          </div>
          <span v-viewer v-else-if="sendmsg.type === 'picture'" style="display: block">
            <img v-lazy="sendmsg.msg" class="img _img-scale" />
          </span>
          <p v-else-if="/http|https/.test(sendmsg.msg)" class="msgCard">
            <a :href="sendmsg.msg">{{sendmsg.msg}}</a>
          </p>
          <p class="msgCard" v-else-if="sendmsg.type === 'string'" @contextmenu.prevent.stop="sCopy">{{ sendmsg.msg }}</p>
          <span class="time">{{time}}</span>
        </div>
      </div>
      <img class="_avater _img-scale" :src="myInfo.imgSrc" alt="" v-viewer />
    </div>
  </div>
</template>

<script>
import rightClick from "../../rightClick";

export default {
  name: '',
  data() {
    return {
      myInfo: this.$store.state.myInfo,
      loadVideo: false,
      axis:{
        x:100,
        y:100
      },
      showCopy: false
    }
  },
  components:{rightClick},
  props: {
    sendmsg: {
      type: Object,
      default: {},
    },
    time:String
  },
  computed: {
    root() {
      console.log(document.querySelector('#chatRecord'));
      return document.querySelector('#chatRecord')
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
      this.axis.x = x
      this.axis.y = y
      this.showCopy = true
      const copy = e => {
        this.showCopy = false
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
  .time{
    position: absolute;
    right: 80px;
  }
  .msgCard {
    max-width: calc(100vw - 470px);
  }
}

@media screen and (max-width: 750px) {
  .messageWarpper {
    padding: 0 5px;
  }
  .time{
    position: absolute;
    right: 60px;
  }
  .msgCard {
    max-width: calc(100vw - 120px);
  }
}
.time{
  white-space: nowrap;
}

.messageWarpper {
  display: flex;
  position: relative;
  float: right;
  margin: 10px 0;

  .img {
    width: 150px;
    height: 150px;
    vertical-align: top;
    margin-right: 10px;
  }

  .video {
    width: 180px;
    height: 180px;
    margin-right: 10px;

    ::v-deep {
      #vjs_video_3 {
        width: 100%;
        height: 180px;
      }
    }
  }
}

.messageWarpper img {
  width: 45px;
  height: 45px;
}

.msgCard {
  /*display: inline-block;*/
  position: relative;
  right: 10px;
  padding: 10px 15px;
  font-size: 16px;
  background-color: skyblue;
  word-break: break-all;
  vertical-align: top;
  border-radius: 5px;
}
</style>
