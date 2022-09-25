<template>
  <div class="navContainer">
    <!-- 头像 -->
    <div class="avaterContainer" @click="showMyInfo">
      <img :src="myInfo.imgSrc" alt="webpon" />
    </div>
    <!-- Tab按钮 -->
    <navItem path="/chat">
      <img src="~assets/nav/message.png" alt="" slot="item-icon" />
      <img src="~assets/nav/message_hover.png" alt="" slot="item-icon-active" />
    </navItem>
    <navItem path="/contacts" @click.native="getOnlineUserInfo">
      <img src="~assets/nav/contacts.png" alt="" slot="item-icon" />
      <img src="~assets/nav/contacts_hover.png" slot="item-icon-active" />
    </navItem>
    <!-- 退出选项 -->
    <a-dropdown class="logoutCon">
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        <a-icon type="import" class="logout" />
      </a>
      <template #overlay>
        <a-menu slot="overlay" class="logoutItem">
          <a-menu-item>
            <a href="javascript:;">个人信息</a>
          </a-menu-item>
          <a-menu-item @click="logout">
            <a href="javascript:;">注销</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import navItem from 'components/common/nav/navItem'
export default {
  name: 'navContainer',
  data() {
    return {
    }
  },
  components: { navItem },
  computed: {
    myInfo() {
      return this.$store.state.myInfo
    },
  },
  created() {
    // setTimeout(() => {
    //   this.myInfo = JSON.parse(sessionStorage.getItem('myInfo'))
    // }, 1000)
  },
  methods: {
    //退出登录
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('myInfo')
      this.$socket.close()
      this.$router.replace('/login')
    },
    //获取在线用户信息
    getOnlineUserInfo() {
      this.$socket.emit('getOnlineUserInfo')
    },
    showMyInfo(){
      alert('You are '+ JSON.parse(localStorage.myInfo).username)
    }
  },
}
</script>
<style scoped>
/* 左边导航栏容器 */
.navContainer {
  width: 60px;
  height: 100vh;
  background-color: #1f273a;
}
/* 头像框布局 */
.avaterContainer {
  position: relative;
  width: 60px;
  height: 60px;
}
/* 头像图片设置 */
.avaterContainer img {
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
/* 退出按钮位置 */
.logoutCon {
  position: fixed;
  bottom: 100px;
  left: 15px;
}
/* 退出按钮大小设置 */
.logout {
  cursor: pointer;
  color: #fff;
  font-size: 30px;
}
</style>
