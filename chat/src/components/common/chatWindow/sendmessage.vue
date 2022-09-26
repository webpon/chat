<template>
  <div>
    <div class="messageWarpper" v-if="sendmsg !== null">
      <span>
        <div v-if="sendmsg.type === 'video'" class="video">
          <lazy-component @show="lazyLoadVideo">
            <img v-if="!loadVideo" style="width: 180px; height: 180px;position: absolute;"
              src="https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif" />
            <video-player v-else :options="{width: 180, height: 180, sources: [{src: sendmsg.msg}]}"
              style="width: 100%;height: 100%" />
          </lazy-component>
        </div>

        <span v-viewer v-else-if="/http|https/.test(sendmsg.msg) || sendmsg.type === 'picture'">
          <img v-lazy="sendmsg.msg" class="img" />
        </span>
        <p class="msgCard" v-else-if="sendmsg.type === 'string'">{{ sendmsg.msg }}</p>
      </span>
      <img :src="myInfo.imgSrc" alt="" v-viewer />
    </div>
  </div>
</template>

<script>
// import lazyComponent from '@/components/utils/lazy-component'
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
  components: {
    // lazyComponent,
  },
  computed: {
    root() {
      console.log(document.querySelector('#chatRecord'));
      return document.querySelector('#chatRecord')
    }
  },
  methods: {
    lazyLoadVideo() {
      this.loadVideo = true
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
  display: flex;
  position: relative;
  float: right;
  margin: 10px 0;

  /* background-color: red; */
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
}
</style>
