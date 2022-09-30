<template>
    <div class="msg_container">
        <div class="moment_msg flex">
            <img :src="$store.state.myInfo.imgSrc" class="_avater">
            <div class="msg">
                <p class="nick">大傻</p>
                <p class="msg_content">{{collect.moments.content}}</p>
                <div v-if="collect.moments.images.length === 1">
                    <img v-if="collect.moments.images[0].type === 1" :src="collect.moments.images[0].url" class="msg_img" alt="">
                    <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
                                  :options="{/*width: 180, */height: 200,
                                  sources: [{src: collect.moments.images[0].url}]}"
                                  style="width: 100%;height: 100%" />
                </div>
                <div v-else>
                    <template v-for="image in collect.moments.images">
                        <img v-if="image.type === 1" :src="image.url" class="msg_img" alt=""
                            style="width: 20px; height: 20px;">
                    </template>
                </div>
                <div class="flex oparate">
                    <p>{{time}}</p>
                    <p class="bar">··</p>
                </div>
                <div class="comment_container">

                    <comment/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import comment from "./comment";
    export default {
        name: "moments",
        components:{comment},
        props:{
            collect:{
                type:Object
            }
        },
        methods:{
            onPlayerPlay() {
                const beforePlayer = this.$store.state.playingVideo
                if (beforePlayer && beforePlayer !== this.$refs.videoPlayer.player) {
                    beforePlayer.pause()
                }
                this.$store.commit('updatePlayingVideo', this.$refs.videoPlayer.player)
            }
        },
        computed:{
            time: function () {
                // 把 yyyy-mm-dd hh:mm:ss 转换成 yyyy/mm/dd hh:mm:ss
                const startData = this.collect.moments.time.replace(new RegExp("-", "gm"), "/");
                const dateTimeStamp = new Date(startData).getTime();
                let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
                let hour = minute * 60;
                let day = hour * 24;
                let week = day * 7;
                // let halfamonth = day * 15;
                let month = day * 30;
                let now = new Date().getTime();   //获取当前时间毫秒
                console.log(now)
                let diffValue = now - dateTimeStamp;//时间差

                if (diffValue < 0) {
                    return;
                }
                let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
                let hourC = diffValue / hour;
                let dayC = diffValue / day;
                let weekC = diffValue / week;
                let monthC = diffValue / month;
                let result;
                if (monthC >= 1 && monthC < 4) {
                    result = " " + parseInt(monthC) + "月前"
                } else if (weekC >= 1 && weekC < 4) {
                    result = " " + parseInt(weekC) + "周前"
                } else if (dayC >= 1 && dayC < 7) {
                    result = " " + parseInt(dayC) + "天前"
                } else if (hourC >= 1 && hourC < 24) {
                    result = " " + parseInt(hourC) + "小时前"
                } else if (minC >= 1 && minC < 60) {
                    result = " " + parseInt(minC) + "分钟前"
                } else if (diffValue >= 0 && diffValue <= minute) {
                    result = "刚刚"
                } else {
                    let datetime = new Date();
                    datetime.setTime(dateTimeStamp);
                    let Nyear = datetime.getFullYear();
                    let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                    let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                    // let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
                    // let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
                    // let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
                    result = Nyear + "-" + Nmonth + "-" + Ndate
                }
                return result;
            }
        }
    }
</script>

<style scoped lang="scss">
.msg_container {
    padding: 20px 20px 0;

    .nick {
        font-weight: bold;
        color: rgb(37, 37, 206);
    }

    .msg_img {
        height: 200px;
    }
}

.msg {
    padding: 0 10px;
    line-height: 25px;
    flex: 1;
}

.oparate {
    justify-content: space-between;
    align-items: center;

    .bar {
        width: 20px;
        height: 13px;
        line-height: 13px;
        background-color: rgb(193, 193, 231);
        text-align: center;
        border-radius: 2px;
        font-weight: bold;
        color: blue;
    }
}

.comment_container {
    background-color: #ddd;
    border-radius: 3px;
    padding: 1px 5px;
}

</style>