<template>
  <div>
    <div class="messageWarpper">
      <img :src="imgSrc" alt="" v-viewer />

      <span class="left-wraper">
        <span class="nick" :style="{color: isOnline ? 'blue' : 'gray'}">{{sendmsg.from}} {{isOnline ? '(在线)':
        '(离线)'}}</span>
        <div v-if="sendmsg.type === 'video'" class="video">
          <video-player :options="{fluid : true, sources: [{src: sendmsg.msg}]}" style="width: 100%;height: 100%" />
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

    ::v-deep {
      #vjs_video_3 {
        width: 100%;
        height: 100%;
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
}
</style>
