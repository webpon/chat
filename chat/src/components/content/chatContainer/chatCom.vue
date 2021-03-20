<template>
  <div class="chatCom">
    <chatTtile />
    <chatBody />
    <chatForm />

  </div>
</template>

<script>
import chatTtile from '../../common/chatWindow/chatTitle'
import chatBody from '../../common/chatWindow/chatBody'
import chatForm from '../../common/chatWindow/chatForm'
export default {
  name: 'chatCom',
  components: {
    chatTtile,
    chatBody,
    chatForm,
  },
}
</script>

<style scoped>
.chatCom {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 310px;
  right: 0;
  background-color: #fff;
  z-index: 1;
}
</style>
