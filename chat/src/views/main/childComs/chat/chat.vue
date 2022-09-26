<template>
  <div id="chat_body">
    <!-- 聊天列表 -->
    <!-- <chatLists /> -->
    <div class="chatLists" v-if="!$store.state.isMobile">
      <chatLists />
    </div>
    <div v-if="$store.state.isMobile">
      <!-- 聊天窗口 -->
      <transition name="chat_move">
        <router-view v-if="$route.path === '/chat'" />
      </transition>
      <transition name="move">
        <router-view v-if="$route.path === '/chat/toChat'" />
      </transition>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import chatLists from '@/views/main/childComs/chat/chatLists'
export default {
  name: 'chat',
  data() {
    return {
      chatCom: 'chatBackground',
    }
  },
  components: {
    chatLists,
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.chat_move-enter-active,
.chat_move-leave-active {
  transition: all 0.3s;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.3s;
}

/* 元素进入或消失过程中的第一帧存在,然后立刻消失 */
.chat_move-enter,
.chat_move-leave-to {
  left: -100vw !important;
}

/* 元素进入或消失过程中的第二帧存在,最后一刻移除 */
.chat_move-enter-to,
.chat_move-leave {
  left: 0px !important;
}

/* 元素进入或消失过程中的第一帧存在,然后立刻消失 */
.move-enter,
.move-leave-to {
  left: 100vw !important;
}

/* 元素进入或消失过程中的第二帧存在,最后一刻移除 */
.move-enter-to,
.move-leave {
  left: 0px !important;
}

.left_0 {
  left: 0;
}

.left_100 {
  left: 100vw;
}

#chat_body {
  display: flex;
  width: 100%;
  height: 100%;
}

.chatLists {
  background-color: #fff;
  position: relative;
  z-index: 100;
}
</style>
