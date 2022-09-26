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
@media screen and (min-width: 750px) {
  .chatCom {
    left: 310px;
  }
}

@media screen and (max-width: 750px) {
  .chatCom {
    left: 0px;
    width: 100vw;
  }
}

.chatCom {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
}
</style>
