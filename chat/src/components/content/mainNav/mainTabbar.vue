<template>
  <navContainer class="nac_Con">
    <navItem path="/chat" activeColor="deeppink">
      <img src="~assets/nav/message.png" alt="" slot="item-icon" />
      <img src="~assets/nav/message_hover.png" alt="" slot="item-icon-active" />
    </navItem>
    <navItem path="/contacts" activeColor="deeppink">
      <img src="~assets/nav/contacts.png" alt="" slot="item-icon" />
      <img
        src="~assets/nav/contacts_hover.png"
        alt=""
        slot="item-icon-active"
      />
    </navItem>
    <a-dropdown class="logoutCon">
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        <a-icon type="import" class="logout" />
      </a>
      <a-menu slot="overlay" class="logoutItem">
        <a-menu-item>
          <a href="javascript:;">个人信息</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="logout">注销</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </navContainer>
</template>
<script>
import navContainer from 'components/common/nav/navContainer'
import navItem from 'components/common/nav/navItem'
export default {
  name: 'MainTabBar',
  components: {
    navContainer,
    navItem,
  },
  methods: {
    logout() {
      // sessionStorage.clear()
      this.$socket.close()
      this.$router.replace('/login')
    },
  },
}
</script>
<style scoped>
.nac_Con {
  position: fixed;
  top: 0;
  left: 0;
}
.logout {
  cursor: pointer;
  color: #fff;
  font-size: 30px;
}
/* .logoutItem {
  position: absolute;
  bottom: 0;
} */
.logoutCon {
  position: fixed;
  bottom: 100px;
  left: 15px;
}
</style>
