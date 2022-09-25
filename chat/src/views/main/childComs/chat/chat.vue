<template>
  <div id="chat_body">
    <!-- 聊天列表 -->
    <!-- <chatLists /> -->
    <div class="chatLists" v-if="!$store.state.isMobile">
       <chatLists />
    </div>
      <!-- 聊天窗口 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <router-view />
    </transition>
    </div>
</template>

<script>
import chatLists from '@/views/main/childComs/chat/chatLists'
export default {
  name: 'chat',
  data() {
    return {
      chatCom: 'chatBackground',
      mobile: true
    }
  },
  components: {
    chatLists,
  },
  methods: {},
}
</script>

<style scoped>
  #chat_body{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .chatLists{
    background-color: #fff;
    position: relative;
    z-index: 100;
  }
 
</style>
