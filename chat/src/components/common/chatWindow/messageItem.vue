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
        <p class="msgCard" v-else>{{ sendmsg.msg }}</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadVideo: false
    }
  },
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
</style>
