<template>
    <van-pull-refresh class="container" ref="container"  v-model="isLoading" @refresh="onRefresh">
        <div class="background">
            <div v-if="showTop" class="top-wrapper flex">
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
            <img :src="$store.state.myInfo.imgSrc" class="b_avater avater _img-scale">
        </div>
        <div class="momentContainer" ref="momentContainer">
            <div v-for="item in momentsList" :key="item.moments.id">
                <moments :collect="item" @delete="deleteMoments" />
                <div class="line"></div>
            </div>
        </div>
        <div class="flex center" style="padding: 10px 0 3px 0"><span v-show="loadingMoments"><a-icon type="loading" style="padding-right: 10px" />正在加载...</span></div>
        <div class="no-more" v-if="!toGet">没有更多了 ~</div>
    </van-pull-refresh>
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
            isLoading: false,
            showTop: false,
            timeFlag: true,
            loadingMoments: false
        }
    },
    mounted() {
        this.$refs.container.$el.style.height = `${window.innerHeight}px`
        this.$refs.container.$el.addEventListener('scroll', this.checkIsBottom)
    },
    methods: {
        onRefresh() {
            this.$moments.get(`/moments/1`).then(({ data: { code, data } }) => {
                if (code === 200) {
                    let arr = []
                    foo:for (let i = 0; i < data.length - 1; i++) {
                        const newId = data[i].moments.id
                        for (let j = 0; j < this.momentsList.length; j++) {
                            const odlId = this.momentsList[j].moments.id
                            if (odlId === newId){
                                continue foo
                            }
                        }
                        arr.push(data[i])
                    }
                    console.log(arr)
                    this.momentsList.unshift(...arr)
                }
                this.isLoading = false
            })
        },
        getMoments({refresh = false} = {}) {
            if(refresh) {
                this.page = 1
                this.toGet = true
            }
            this.$moments.get(`/moments/${this.page}`).then(({ data: { code, data } }) => {
                if (code === 200) {
                    if(refresh) {
                        this.momentsList = data
                    } else {
                        this.momentsList.push(...data)
                    }
                } else {
                    this.toGet = false
                }
                this.loadingMoments = false
            })
        },
        deleteMoments(id) {
            this.momentsList = this.momentsList.filter(v => {
                return v.moments.id !== id
            })
        },
        toEditMoment() {
            this.$router.push({
                path: '/discover/editMoment'
            })
        },
        checkIsBottom() {
            const container = this.$refs.container.$el
            if (this.timeFlag) {
                this.timeFlag = false
                setTimeout(() => {
                    if (container.scrollTop >= 200) {
                        this.showTop = true
                    } else {
                        this.showTop = false
                    }
                    this.timeFlag = true
                }, 300)
            }

            if(!this.toGet) return
            clearTimeout(this.loadTimer)
            this.loadTimer = setTimeout(() => {
                if (container.clientHeight + container.scrollTop > container.scrollHeight - 60) {
                    this.loadingMoments = true
                    this.page++
                    this.getMoments()
                }
            }, 100)
        },
    },
    activated() {
        this.showTop = false
        this.getMoments({refresh: true})
    }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
    .moment_back{
        width: 500px;
    }
    .top-wrapper {
        width: 500px;
    }
    .back {
        position: absolute !important;
    }
}
@media screen and (max-width: 750px) {
    .bar {
        height: 50px;
        background-color: #fff;
        width: 100vw;
    }
    .moment_back {
        width: 100vw;
    }
    .top-wrapper {
        width: 100vw;
    }
}

.container {
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;

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
        height: 60px;
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }
}

.momentContainer {
    overflow-y: auto;
    
    .line {
        height: 1px;
        background-color: #ddd;
    }
}

.moment_back {
    height: 230px;
}

.back {
    position: fixed;
    color: #fff;
    top: 20px;
    left: 15px;
}
.no-more {
    text-align: center;
    padding: 10px 0 0 0;
}

</style>
  