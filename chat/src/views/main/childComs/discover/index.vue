<template>
    <div class="background">
        <div v-if="$store.state.isMobile && isNeedAnimate">
            <!-- 聊天窗口 -->
            <transition name="chat_move">
                <router-view v-if="$route.path === '/discover'"/>
            </transition>
            <transition name="move">
                <router-view v-if="$route.path !== '/discover'" />
            </transition>
        </div>
        <div v-else>
            <router-view />
        </div>
    </div>
</template>
  
<script>
export default {
    computed: {
        isNeedAnimate() {
            const matched = this.$route.matched
            return /^\/discover/.test(matched[matched.length - 1].path)
        }
    },
    mounted() {
        console.log(this.$route);
    }
}
</script>
  
<style scoped lang="scss">
.chat_move-enter-active,
.chat_move-leave-active {
    transition: all 0.2s;
}

.move-enter-active,
.move-leave-active {
    transition: all 0.2s;
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

.background {
    position: fixed;
}
</style>
  