<template>
  <div>
    <div v-if="msg.to === $route.query.userName && msg.from !== $store.state.myInfo.username">
      <!-- 群聊别人的信息 -->
      <messageItem :sendmsg="msg"/>
    </div>
    <div v-else-if="msg.from === $route.query.userName">
      <!-- 别人的信息 -->
      <messageItem :sendmsg="msg"/>
    </div>
    <div v-else-if="msg.from === $store.state.myInfo.username">
      <!-- 自己的信息 -->
      <sendmessage :sendmsg="msg"/>
    </div>
  </div>
</template>

<script>
import messageItem from './messageItem.vue'
import sendmessage from './sendmessage.vue'
export default {
  name: '',
  data() {
    return {
      myInfo : JSON.parse(localStorage.myInfo)
    }
  },
  props: {
    msg: {
      type: Object,
      default: {},
    },
  },
  components: {
    messageItem,
    sendmessage,
  },
}
</script>

<style scpoed></style>
