<template>
  <div class="listItem" @click="toChat" :class="{ active: isActive == true }">
    <div class="list_avater_container">
      <img class="_avater" :src="userInfo.imgSrc" />
    </div>
    <div class="msgContainer">
      <p class="Title">
        {{ userInfo.username }}
      </p>
      <p class="text">{{ userInfo.msg }}</p>
    </div>
    <div class="num" v-if="userInfo.msgNumber !== 0">
      {{userInfo.msgNumber}}
    </div>
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
      this.$store.commit("updateMsgNum", this.userInfo)
      this.$router.push({
        path: '/chat/toChat',
        query: { userName: this.userInfo.username },
      })
    },
  },
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .listItem {
    background-color: #eae8e7;
  }
}

@media screen and (max-width: 750px) {
  .listItem {
    background-color: #fff;
  }
}

.listItem {
  height: 65px;
  width: 100%;
  display: flex;
  position: relative;
  /* cursor: pointer; */
}

.listItem:hover {
  background-color: #cac8c6;
}

.list_avater_container {
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

.num {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: white;
  line-height: 15px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
}
</style>
