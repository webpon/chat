<template>
    <div class="container" ref="container">
        <div class="background">
            <div v-if="showTop" class="top-wrapper flex center">
                <a-icon type="left" class="_back back" @click="back" />
                <p style="color: #fff;font-weight: bold; font-size: 15px">朋友圈</p>
                <a-icon type="camera" class="post_moment" theme="filled" @click="toEditMoment" />
            </div>
            <template v-else>
                <a-icon type="left" class="_back back" @click="back" />
                <a-icon type="camera" class="post_moment" theme="filled" @click="toEditMoment" />
            </template>


            <img class="moment_back"
                src="https://picx.zhimg.com/80/v2-35857f0199cc225e186098e765dd173c_720w.webp?source=1940ef5c" />
            <img :src="$store.state.myInfo.imgSrc" class="b_avater avater">
        </div>
        <div class="momentContainer" ref="momentContainer">
            <moments v-for="item in momentsList" :collect="item" :key="item.moments.id" @delete="deleteMoments" />
        </div>
    </div>
</template>

<script>
import moments from "@/components/moments/moments";

export default {
    name: "momentsView",
    components: { moments },
    data() {
        return {
            momentsList: [],
            page: 1,
            toGet: true,
            loadTimer: null,
            showTop: false,
            timeFlag: true
        }
    },
    mounted() {
        this.$refs.container.style.height = `${window.innerHeight}px`
        this.$refs.container.addEventListener('scroll', this.checkIsBottom)
    },
    methods: {
        getMoments({ isRefresh = false } = {}) {
            this.$moments.get(`http://150.158.191.140:5389/moments/${this.page}`).then(({ data: { code, data } }) => {
                if (code === 200) {
                    if (isRefresh) {
                        this.momentsList = data
                    } else {
                        this.momentsList.push(...data)
                    }
                } else {
                    this.toGet = false
                }
            })
        },
        deleteMoments() {
            this.getMoments({ isRefresh: true })
        },
        toEditMoment() {
            this.$router.push({
                path: '/discover/editMoment'
            })
        },
        checkIsBottom() {
            const container = this.$refs.container
            if (this.timeFlag) {
                this.timeFlag = false
                setTimeout(() => {
                    if (container.scrollTop >= 230) {
                        this.showTop = true
                    } else {
                        this.showTop = false
                    }
                    this.timeFlag = true
                }, 300)
            }
            clearTimeout(this.loadTimer)
            this.loadTimer = setTimeout(() => {

                console.log(container.scrollTop);

                if (container.clientHeight + container.scrollTop > container.scrollHeight - 20) {
                    console.log('竖向滚动条已经滚动到底部')
                    this.page++
                    this.getMoments()
                }
            }, 100)
        },
    },
    watch: {
        page: {
            handler() {
                this.getMoments()
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 750px) {
    .bar {
        height: 50px;
        background-color: #fff;
        width: 100vw;
    }
}

.container {
    position: fixed;
    overflow-y: auto;

    .background {
        position: relative;
        margin-bottom: 20px;

        .avater {
            position: absolute;
            bottom: -15px;
            right: 15px;
        }

        .post_moment {
            position: absolute;
            right: 15px;
            top: 20px;
            font-size: 20px;
            color: #fff;
        }
    }

    .top-wrapper {
        position: fixed;
        top: 0;
        background-color: rgba(#000, 0.9);
        width: 100vw;
        height: 60px;
    }
}

.momentContainer {
    overflow-y: auto;
}

.moment_back {
    height: 230px;
    width: 100vw;
}

.back {
    position: fixed;
    color: #fff;
    top: 20px;
    left: 10px;
}
</style>
  