<template>
  <div id="app">
    <transition name="msgMove">
        <msg-hint v-show="$store.state.msgHint.show"/>
    </transition>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Layout from './views/main/layout'
import msgHint from "./components/common/chatWindow/msgHint";
document.oncontextmenu = function(e){
  return false
  //或者 e.preventDefault()
}

export default {
  name: 'App',
  data() {
    return {
      ring: false
      ,isShow:false
    }
  },
  components: { Layout, msgHint },
  computed: {
    path: function () {
      return this.$route.path
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
  },
  mounted() {
    setTimeout(() => {
      this.ring = true
    }, 500)
    this.updateDeviceInfo()
    window.addEventListener("resize", () => {
      if (this.updateTimer) {
        clearTimeout(this.updateTimer)
      }
      this.updateTimer = setTimeout(() => {
        this.updateDeviceInfo()
      }, 300)
    });
  },
  methods: {
    updateDeviceInfo() {
      this.$store.commit('checkDevice', window.matchMedia("only screen and (max-width: 750px)").matches)
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/common.scss';
@import '~@/styles/base.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &router-link-exact-active {
      color: #42b983;
    }
  }
}
.msgMove-enter-active,
.msgMove-leave-active {
  transition: all 0.25s ease-out;
}

/* 元素进入或消失过程中的第一帧存在,然后立刻消失 */
.msgMove-enter,
.msgMove-leave-to {
  top: -70px !important;
}

/* 元素进入或消失过程中的第二帧存在,最后一刻移除 */
.msgMove-enter-to,
.msgMove-leave {
  top: 10px !important;
}
</style>
