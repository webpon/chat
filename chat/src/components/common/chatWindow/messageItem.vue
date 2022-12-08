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
        <span v-viewer v-else-if="sendmsg.type === 'picture'">
          <img v-lazy="sendmsg.msg" class="img _img-scale" />
        </span>
        <div class="pre msgCard" v-else-if="sendmsg.from === '智能客服'"
          @contextmenu.prevent.stop="showPopoverFun" v-html="markdown2html(sendmsg.msg)"></div>
        <p class="msgCard" v-else @contextmenu.prevent.stop="showPopoverFun">{{ sendmsg.msg }}</p>
        <p>{{ time }}</p>
      </span>
    </div>
    <van-action-sheet v-model:show="showPopover" style="position: absolute;" :actions="[{ name: '复制', type: 'copy' }]"
      get-container=".chatBody" cancel-text="取消" close-on-click-action @select="onSelect" />
  </div>
</template>

<script>
import rightClick from "../../rightClick";
import { Toast } from 'vant';
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/foundation.css";
export default {
  data() {
    return {
      loadVideo: false,
      showPopover: false,
      actions: [
        { text: '复制', type: 'copy' },
        { text: 'Toast', type: 'toast' },
      ],
      popoverPosition: [0, -130]
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
      return  marked(markdownText);
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
    showPopoverFun({ x, y }) {
      this.showPopover = !this.showPopover
    },
    onSelect({ type }) {
      if (type === 'copy') {
        this.copy()
        Toast('复制成功')
      } else if (type === 'toast') {
        Toast('toast')
      }
    },
    copy() {
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

  .msgCard {
    max-width: calc(100vw - 470px);
  }
}

@media screen and (max-width: 750px) {
  .messageWarpper {
    padding: 0 5px;
  }

  .msgCard {
    max-width: calc(100vw - 120px);
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
