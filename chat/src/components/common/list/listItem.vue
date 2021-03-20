<template>
  <div class="listItem" @click="toChat" :class="{ active: isActive == true }">
    <div class="list_avater_container">
      <img :src="userInfo.imgSrc" alt="" :key="Math.random()" />
    </div>
    <div class="msgContainer">
      <p class="Title">
        {{ userInfo.username }}
      </p>
      <p class="text">{{ userInfo.msg }}</p>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: [],
    },
  },
  components: {},
  methods: {
    toChat() {
      this.$router.push({
        path: '/chat/toChat',
        query: { userName: this.userInfo.username },
      })
     
      // this.isActive = !this.isActive

      // this.$store.commit('activeUser', this.userInfo)
      // console.log(this.$store.state.activeUser)
    },
  },
}
</script>

<style scoped>
.listItem {
  height: 65px;
  width: 100%;
  background-color: #eae8e7;
  display: flex;
  position: relative;
  /* cursor: pointer; */
}
.listItem:hover {
  background-color: #cac8c6;
}
.list_avater_container {
  width: 60px;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.list_avater_container img {
  width: 42px;
  height: 42px;
}
.msgContainer {
  position: absolute;
  top: 50%;
  left: 65px;
  transform: translateY(-50%);
}
.Title {
  font-size: 16px;
  font-weight: 600;
}
.text {
  /* line-height: 10px; */
  width: 170px;
  text-align: left;
  /* 设置文本不换行 */
  white-space: nowrap;
  /* 文本超出裁剪 */
  overflow: hidden;
  /* 溢出用省略号代替，需要和overflow和配合使用 */
  text-overflow: ellipsis;
}
</style>
<style>
.listItem p {
  margin-bottom: 0;
  -moz-user-select: none;

  -webkit-user-select: none;

  user-select: none;
}
.active {
  background-color: red !important;
}
</style>
