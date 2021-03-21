<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Layout from './views/main/layout'
import { message } from 'ant-design-vue';
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
    console.log('APPmounted');
    //如果token存在且部为login页面就进行websocket连接，这是为了防止刷新断开连接
    if (localStorage.token && this.path !== '/login' && this.$socket.disconnected) {
      this.$socket.open()
       //获取在线用户列表
      this.$socket.on('sendList', (data)=> {
        this.contacts = data
        console.log(data);
        this.$store.commit('updateContacts',data)
        console.log(this.$store.state.contacts);
      })
    }
     //监听消息
    this.$socket.on('emitEvent', (data) => {
      console.log(data)
      let imgSrc
      if(data.to === '群聊'){
        message.info(data.from+'向群聊发送了一条消息')
      }else{
        message.info(data.from+'向你发来一条消息')
        console.log(this.$store.state.contacts);
        this.$store.state.contacts.forEach(item => {
          console.log(item);
          if (item.username === data.from) {
            console.log(item);
            imgSrc = item.imgSrc
          }
        });
        this.bus.$emit('chatUser',{
          username:data.from,
          imgSrc:imgSrc
          })
          console.log({
          username:data.from,
          imgSrc:imgSrc
          });
      }
      this.$store.commit('addMsg', data)
    })
  },
  beforeDestroy(){
    //移除监听事件,避免重复监听
    console.log('beforeDestroy');
    this.$socket.off('emitEvent');
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
