<template>
    <div class="background">
        <div v-if="$store.state.isMobile">
            <transition :name="transitionName">
                <keep-alive>
                    <router-view class="transitionBody"></router-view>
                </keep-alive>
            </transition>
        </div>
        <div v-else>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            transitionName: '',
        }
    },
    //控制左右滑动
    watch: {
        '$route'(to, from) {
            const arr = ['/discover', '/discover/moments', '/discover/editMoment', '/discover/fastEmail']
            this.transitionName = arr.indexOf(to.path) > arr.indexOf(from.path) ? 'transitionLeft' : 'transitionRight'
        }
    }
}
</script>
  
<style scoped lang="scss">
@media screen and (min-width: 750px) {
    .background {
        width: 500px;
        margin: auto;
    } 
}
.transitionBody {
    transition: all 0.3s ease-out; //设置动画
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
  