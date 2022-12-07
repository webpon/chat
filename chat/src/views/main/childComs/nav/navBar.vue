<template>
  <div class="navContainer">
    <!-- 头像 -->
    <navItem style="order: 3;" path="/info" v-if="$store.state.isMobile">
      <a-icon style="fontSize: 25px;" type="user" slot="item-icon"/>
      <a-icon style="fontSize: 25px; color: green;"  type="user" slot="item-icon-active"/>
    </navItem>
    <div v-else class="avaterContainer" @click="showMyInfo">
      <img class="_avater _img-scale" :src="myInfo.imgSrc" alt="webpon" />
    </div>
    <!-- Tab按钮 -->
    <navItem path="/chat">
      <a-icon style="fontSize: 25px;" type="message" slot="item-icon"/>
      <a-icon style="fontSize: 25px; color: green;" theme="filled" type="message" slot="item-icon-active"/>
    </navItem>
    <navItem path="/contacts" @click.native="getOnlineUserInfo">
      <a-icon style="fontSize: 25px;" type="contacts" slot="item-icon"/>
      <a-icon style="fontSize: 25px; color: green;" theme="filled" type="contacts" slot="item-icon-active"/>
    </navItem>  
    <navItem path="/discover" @click.native="getOnlineUserInfo">
      <a-icon style="fontSize: 25px;" type="compass" slot="item-icon"/>
      <a-icon style="fontSize: 25px; color: green;" theme="filled" type="compass" slot="item-icon-active"/>
    </navItem>
    
    <!-- 退出选项 -->
    <a-dropdown class="logoutCon" v-if="!$store.state.isMobile">
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

  methods: {
    //退出登录
    logout() {
      localStorage.removeItem('token')
      this.$store.commit('updateMyInfo', {})
      this.$socket.close()
      this.$router.replace('/login')
    },
    //获取在线用户信息
    getOnlineUserInfo() {
      this.$socket.emit('getOnlineUserInfo')
    },
    showMyInfo() {
      alert('You are ' + this.$store.state.myInfo.username)
    }
  },
}
</script>
<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .navContainer {
    width: 60px;
    height: 100vh;
    background-color: #1f273a;
  }

  .logoutCon {
    position: fixed;
    bottom: 100px;
    left: 15px;
  }
}

@media screen and (max-width: 750px) {
  .navContainer {
    width: 100vw;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.7);;
  }

  .avaterContainer {
    order: 3;
  }
  .logoutCon {
    display: flex;
    align-items: center;
    order: 3;

  }
  .tab-bar-item {
    flex: 0;
  }
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

/* 退出按钮大小设置 */
.logout {
  cursor: pointer;
  color: #fff;
  font-size: 30px;
}
</style>
