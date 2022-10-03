<template>
  <div id="app">
    <transition appear>
        <msg-hint v-show="$store.state.msgHint.show"/>
    </transition>
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <easy-ring :open="true" :ring="ring" src="https://webpon-img.oss-cn-guangzhou.aliyuncs.com/music/14289.mp3" /> -->
    <!-- <audio controls>
    <source src="horse.ogg" type="audio/ogg">
    <source src="horse.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 元素。
  </audio> -->
  </div>
</template>
<script>
import Layout from './views/main/layout'
import msgHint from "./components/common/chatWindow/msgHint";
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
      this.$store.commit('checkDevice', /Mobi|Android|iPhone/i.test(navigator.userAgent))
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
.v-enter-active{
  animation: test 0.1s;
}

.v-leave-active{
  animation: test 0.1s reverse;
}

@keyframes test {
  from{
    transform: translateY(-100%);
  }
  to{
    transform: translateY(0);

  }
}

</style>
