<template>
    <div class="msg_container">
        <div class="moment_msg flex">
            <img :src="user.imgSrc" class="_avater">
            <div class="msg">
                <p class="nick">{{user.username}}</p>
                <p class="msg_content">{{col.moments.content}}</p>
                <div v-if="col.moments.images.length === 1">
                    <img v-if="col.moments.images[0].type === 1" :src="col.moments.images[0].url" class="msg_img"
                        @click="previewImg(0)">
                    <video-player @play="onPlayerPlay" ref="videoPlayer" v-else :options="{/*width: 180, */height: 200,
                    sources: [{src: col.moments.images[0].url}]}" style="width: 100%;height: 100%" />
                </div>
                <div v-else>
                    <template v-for="(image, index) in col.moments.images">
                        <img v-if="image.type === 1" :src="image.url" class="msg_img" alt=""
                            style="width: 97px; height: 97px;" @click="previewImg(index)">
                    </template>
                </div>
                <div class="flex oparate">
                    <div>
                        <p>{{time}}</p>
                        <span v-if="col.moments.my" @click="deleteMoments">删除</span>
                    </div>
                    <div>
                        <div v-show="showOparate">
                            <button @click="like">点赞</button>
                            <button @click="()=>{
                                this.showComment = true
                                this.showOparate = false
                                this.prompt='评论'
                            }">评论
                            </button>
                        </div>
                        <p class="bar" @click="showOparate = !showOparate">··</p>
                    </div>
                </div>
                <div class="comment_container">
                    <!-- todo 点赞展示-->

                    <template v-for="item in col.comments">
                        <comment :comment="item" :key="item.id" @send="update" />
                        <comment v-if="item.children.length > 0" v-for="c in item.children" :comment="c" :key="c.id"
                            :reply-id="item.userId" />
                    </template>
                    <div class="comment" v-show="showComment">
                        <a-textarea :maxLength="200" :placeholder="prompt" :rows="4" v-model.trim="commentObj.content"
                            @pressEnter.prevent="sendMsg" />
                        <button @click="sendMsg">发送</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import comment from "./comment";
import { ImagePreview, Dialog } from 'vant';

export default {
    name: "moments",
    data: function () {
        return {
            showOparate: false,
            showComment: false,
            commentObj: {
                content: null,
                momentsId: null
            },
            col: this.collect,
            user: {
                username: null,
                imgSrc: null
            },
            prompt: "评论",
            show: false
        }
    },
    components: { comment },
    props: {
        collect: {
            type: Object
        }
    },
    created() {
        let id = this.col.moments.userId;
        this.$http.get("/user", { params: { id } }).then(({ data: { userInfo } }) => {
            this.user = userInfo
        })
    },
    methods: {
        previewImg(index) {
            ImagePreview({
                images: this.col.moments.images.map(item => item.url),
                startPosition: index,
            });
        },
        onPlayerPlay() {
            const beforePlayer = this.$store.state.playingVideo
            if (beforePlayer && beforePlayer !== this.$refs.videoPlayer.player) {
                beforePlayer.pause()
            }
            this.$store.commit('updatePlayingVideo', this.$refs.videoPlayer.player)
        },
        sendMsg() {
            this.commentObj.momentsId = this.col.moments.id
            this.$moments.post("/comment", this.commentObj).then(({ data: { msg, code, data } }) => {
                if (code === 200) {
                    if (data.replyId === 0) {
                        this.col.comments.push(data)
                        return
                    }
                    let comments = this.col.comments;
                    for (let i = 0; i < comments.length; i++) {
                        let c = comments[i]
                        if (c.id === data.replyId) {
                            c.children.push(data)
                            break
                        }
                    }
                    this.col.comments = comments
                    return;
                }
                this.$message.warn(msg)
            })
            this.commentObj = {
                content: "",
                momentsId: null,
                replyId: null
            }
            this.showComment = false
        },
        update(id) {
            this.commentObj.replyId = id
            this.showComment = true
        },
        like() {
            this.$moments.post("/like", { momentsId: this.col.moments.id })
                .then(({ data: { code, data } }) => {
                    if (code === 200) {
                        this.col.likes.push(data)
                    }
                })
            this.showOparate = false
        },
        deleteMoments() {
            Dialog.confirm({
                title: '提示',
                message: '删除该朋友圈？',
            })
                .then(() => {
                    this.$moments.delete(`/moments/${this.col.moments.id}`)
                        .then(({ data: { code } }) => {
                            if (code === 200) {
                                this.$emit("delete", this.col.moments.id)
                            }
                        })
                })
                .catch(() => {
                    // on cancel
                });

        }
    },
    computed: {
        time() {
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
        width: 200px;
        padding: 0 5px 0 0;
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

    >div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        height: 30px;

        span {
            color: red;
            width: 40px;
            text-align: center;
            margin-left: 5px;
        }

        >div {
            background-color: #1f273a;
            margin-right: 5px;

            button {
                background: none;
                color: #ffffff;
                border: none;
            }

            button:last-child {
                border-left: #ffffff 1px solid;
            }
        }

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
}

.comment_container {
    background-color: #ddd;
    border-radius: 3px;
    padding: 1px 5px;
}

.comment {
    display: flex;
    height: 30px;
    width: 95%;
    margin: 5px 7px;

    button {
        width: 60px;
        border: none;
    }

    .ant-input {
        height: 100%;
    }
}
</style>