<template>
  <div>
    <div v-if="msg.from === $route.query.userName">
      <messageItem :sendmsg="msg"/>
    </div>
    <div v-else-if="myInfo.username">
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
