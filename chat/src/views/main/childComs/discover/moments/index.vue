<template>
    <div class="container">
        <div class="background">
            <a-icon type="left" class="_back back" @click="back"/>
            <img class="moment_back"
                 src="https://picx.zhimg.com/80/v2-35857f0199cc225e186098e765dd173c_720w.webp?source=1940ef5c"/>
            <img :src="$store.state.myInfo.imgSrc" class="b_avater avater">
        </div>
        <div>
                <moments v-for="item in momentsList" :collect="item" :key="item.moments.id"/>
        </div>
    </div>
</template>

<script>
    import moments from "@/components/moments/moments";

    export default {
        name: "momentsView",
        components: {moments},
        data() {
            return {
                momentsList: [],
                p: 1,
                toGet: true
            }
        },
        methods: {
            getMoments() {
                this.$moment.get(`/moments/${this.p}`).then(({data: {code, data}}) => {
                    if (code === 200) {
                        this.momentsList.push(...data)
                    } else {
                        this.toGet = false
                    }
                })
            }
        },
        watch: {
            p: {
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

        .background {
            position: relative;
            margin-bottom: 20px;

            .avater {
                position: absolute;
                bottom: -15px;
                right: 15px;
            }
        }
    }

    .moment_back {
        height: 230px;
        width: 100vw;
    }

    .back {
        position: absolute;
        top: 10px;
        color: #fff;
    }
</style>
  