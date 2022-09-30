<template>
  <div>
    <div class="messageWarpper" v-if="sendmsg !== null">
      <span>
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
        <p class="msgCard" v-else-if="sendmsg.type === 'string'">{{ sendmsg.msg }}</p>
      </span>
      <img class="_avater" :src="myInfo.imgSrc" alt="" v-viewer />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      myInfo: this.$store.state.myInfo,
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
  display: inline-block;
  position: relative;
  max-width: 180px;
  right: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  background-color: skyblue;
  word-break: break-all;
  vertical-align: top;
  border-radius: 5px;
}
</style>
