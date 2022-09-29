<template>
    <div class="background">
        <div class="top_title">发现</div>
        <div class="series">
            <div class="bar friend" @click="toMoments">
                朋友圈
                <a-icon type="right" />
            </div>
        </div>
        <div class="series">
            <div class="bar friend">
                摇一摇
                <a-icon type="right" />
            </div>
            <div class="line"></div>
            <div class="bar friend">
                附近的人
                <a-icon type="right" />
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    computed: {
    },
    methods: {
        toMoments() {
            this.$router.push({
                path: '/discover/moments',
                // query: '111',
            })
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

.line {
    height: 1px;
    background-color: #eee;
    // margin-left: 65px;
    margin: 0 20px;
    z-index: 100;
}

.bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    width: 100vw;
}

.series {
    margin-bottom: 10px;
    background-color: #fff;
}

.top_title {
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 0;
}

.background {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avaterContainer {
    display: flex;
    padding: 20px 0;
    width: 90vw;

    img {
        width: 60px;
        height: 60px;
    }

    .name-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    .nick-name {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 0;
    }

    .status {
        margin-bottom: 0;
        color: green;
    }
}

.logout {
    width: 70vw;
    position: absolute;
    bottom: 100px;
}
</style>
  