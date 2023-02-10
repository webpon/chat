<template>
  <div>
    <div class="messageWarpper">
      <img class="_avater _img-scale" :src="imgSrc" alt="" v-viewer />
      <span class="left-wraper">
        <span>
          {{ sendmsg.from }}
          <span class="nick" v-if="$route.query.userName === '群聊'" :style="{ color: isOnline ? 'blue' : 'gray' }">
            {{ isOnline ? '(在线)' :
                '(离线)'
            }}</span>
        </span>
        <div v-if="sendmsg.type === 'video'" class="video">
          <lazy-component @show="lazyLoadVideo">
            <img v-if="!loadVideo" class="_img-scale" style="width: 180px; height: 180px;position: absolute;"
              src="https://webpon-img.oss-cn-guangzhou.aliyuncs.com/loading.gif" />
            <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
              :options="{ width: 180, height: 180, sources: [{ src: sendmsg.msg }] }"
              style="width: 100%;height: 100%" />
          </lazy-component>
        </div>
        <div v-else-if="sendmsg.type === 'file'" class="msgCard">
            文件：
            <p>{{ sendmsg.name }}</p>
            <a :href="sendmsg.msg" target="_blank">{{ sendmsg.msg }}</a>
        </div>
        <span v-viewer v-else-if="sendmsg.type === 'picture'">
          <img v-lazy="sendmsg.msg" class="img _img-scale" />
        </span>
        <template v-else-if="sendmsg.from === '智能客服'">
          <div class="pre msgCard" v-html="markdown2html(sendmsg.msg)"
            v-if="sendmsg.model === 'text-davinci-003' || sendmsg.model === 'chatgpt'"></div>
          <div class="msgCard" v-if="sendmsg.model === 'picture-model'">
            <span v-viewer>
              <img v-lazy="item.url" class="img _img-scale" v-for="item in sendmsg.msg" :key="item.url" />
            </span>
          </div>
        </template>
        <p class="msgCard" v-else>{{ sendmsg.msg }}</p>
        <p>{{ time }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import rightClick from "../../rightClick";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/foundation.css";
export default {
  data() {
    return {
      loadVideo: false,
    }
  },
  components: { rightClick },
  props: {
    sendmsg: {
      type: Object,
      default: {},
    },
    time: String
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
    },
  },
  methods: {
    markdown2html(markdownText) {
      console.log(markdownText);
      const render = new marked.Renderer();
      marked.setOptions({
        renderer: render, // 这是必填项
        gfm: true, // 启动类似于Github样式的Markdown语法
        pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
        sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
        // 高亮的语法规范
        highlight: (code) => hljs.highlightAuto(code).value,
        heading: (text, level) => text + level,
      });
      console.log(marked(markdownText));
      return marked(markdownText);
    },
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

  .msgCard {
    max-width: calc(100vw - 470px);
  }
}

@media screen and (max-width: 750px) {
  .messageWarpper {
    padding: 0 5px;
  }

  .msgCard {
    max-width: calc(100vw - 115px);
  }
}

.messageWarpper {
  position: relative;
  float: left;
  display: flex;
  margin: 10px 0;

  .img {
    width: 150px;
    max-height: 500px;
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


.msgCard {
  display: inline-block;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  word-break: break-all;
  border-radius: 5px;
}

.pre {
  display: block;
  padding: 0.6rem;
  background-color: rgba(128, 100, 169, 0.1);
  border-radius: 0.4rem;
  box-shadow: 0.15rem 0.15rem 0.5rem rgb(150 150 150);
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 500px;
  overflow: auto;
}

.cp {
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

  button:hover {
    background-color: rgba(104, 91, 91, 0.73);
  }
}
</style>
