<template>
    <div class="background">
        <div v-if="$store.state.isMobile && isNeedAnimate">
            <transition :name="transitionName">
                <router-view class="transitionBody"></router-view>
            </transition>
        </div>
        <div v-else>
            <router-view />
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            transitionName: 'transitionLeft'
        }
    },
    computed: {
        isNeedAnimate() {
            console.log("+++++++");
            console.log(this.$route);
            const matched = this.$route.matched
            return /^\/discover/.test(matched[matched.length - 1].path)
        },
    },
    //控制左右滑动
    watch: {
        '$route'(to, from) {
            const arr = ['/discover', '/discover/moments', '/discover/editMoment']
            this.transitionName = arr.indexOf(to.path) > arr.indexOf(from.path) ? 'transitionLeft' : 'transitionRight'
        }
    }
}
</script>
  
<style scoped lang="scss">
.transitionBody {
    transition: all 0.4s ease-out; //设置动画
}

.transitionLeft-enter,
.transitionRight-leave-to {
    transform: translate(100%, 0);
}

.transitionLeft-enter-to {
    transform: translate(0, 0);
}

.transitionLeft-leave-to,
.transitionRight-enter {
    transform: translate(-100%, 0);
}

.transitionLeft-enter-active,
.transitionRight-enter-active {
    //防止过渡时元素抖动
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
</style>
  