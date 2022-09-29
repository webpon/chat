<template>
  <div class="chatBackground">
    <div class="chatLists" v-if="$store.state.isMobile" >
      <chatLists />
    </div>
    <div class="bac_title" v-else>
      基于Vue+express+Websocket+mongodb实时聊天
    </div>

  </div>
</template>

<script>
import chatLists from '@/views/main/childComs/chat/chatLists'
export default {
  name: 'chatBackground',
  data() {
    return {}
  },
  components: {
    chatLists,
  },
  created() {
  },
}
</script>

<style scoped>
@media screen and (min-width: 750px) {
  .chatBackground {
     left: 310px;
     background-color: #fff;
  }
  .chatLists {
    background-color: #fff;
  }
}

@media screen and (max-width: 750px) {
  .chatBackground {
     left: 0px;
  }
}
.chatBackground {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
}

.bac_title {
  font-size: 23px;
  font-weight: 600;
  line-height: 100vh;
  text-align: center;
}

.chatLists {
  position: relative;
  z-index: 100;
}
</style>
