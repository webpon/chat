<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Layout from './views/main/layout'
export default {
  name: 'App',
  components: { Layout },
  data() {
    return {}
  },
  computed: {
    path: function() {
      return this.$route.path
    },
  },
  mounted() {
    //如果token存在且部为login页面就进行websocket连接，这是为了防止刷新断开连接
    if (localStorage.token && this.path !== '/login') {
      this.$socket.open()
    }
     //监听消息
    this.$socket.on('emitEvent', (data) => {
      console.log(data)
      this.$store.commit('addMsg', data)
    })
  },
  watch: {
    path(newName, oldName) {
      if (this.path !== '/login') {
        this.$socket.open()
      }
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
