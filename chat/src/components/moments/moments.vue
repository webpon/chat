<template>
    <div class="msg_container">
        <div class="moment_msg flex">
            <img :src="user.imgSrc" class="_avater" @click="toChat(user.username)">
            <div class="msg">
                <span class="nick" @click="toChat(user.username)">{{user.username}}</span>
                <p class="msg_content">{{col.moments.content}}</p>
                <div v-if="col.moments.images.length === 1">
                    <img v-if="col.moments.images[0].type === 1" v-lazy="col.moments.images[0].url" class="msg_img"
                        @click="previewImg(0)">
                    <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
                                    :options="{height: 200,
                                    sources: [{src: col.moments.images[0].url}]}"
                                    style="width: 100%;height: 100%" />
                </div>
                <div v-else style="min-width: 290px">
                    <template v-for="(image, index) in col.moments.images">
                        <img v-if="image.type === 1" v-lazy="image.url" class="msg_img" alt=""
                            style="width: 90px; height: 90px;" @click="previewImg(index)">
                    </template>
                </div>
                <div class="flex oparate">
                    <div>
                        <p>{{time}}</p>
                        <span v-if="col.moments.my || col.moments.admin" @click="deleteMoments">删除</span>
                    </div>
                    <div>
                        <div v-show="showOparate">
                            <button @click="like" v-if="collect.isMyLike">
                                <svg t="1664639307088" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="2597" width="20" height="20"
                                    style="position:relative; top: 4px;"
                                >
                                    <path d="M32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512L562.592 892.8a96 96 0 0 1-124.416-1.952l-308.16-270.688A278.976 278.976 0 0 1 32 407.584z" p-id="4428" fill="#d81e06"></path>
                                </svg>
                                取消
                            </button>
                            <button @click="like" v-else>
                                <svg t="1664639307088" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="2597" width="20" height="20"
                                    style="position:relative; top: 4px;"
                                >
                                    <path d="M512 883.2l-140.8-140.8c-4.266667-4.266667-8.533333-8.533333-17.066667-12.8l-209.066666-209.066667c-85.333333-85.333333-85.333333-221.866667 0-307.2l4.266666-4.266666c85.333333-85.333333 221.866667-85.333333 307.2 0l55.466667 42.666666 46.933333-46.933333c85.333333-85.333333 221.866667-85.333333 307.2 0l4.266667 4.266667c85.333333 85.333333 85.333333 221.866667 0 307.2L512 883.2zM311.466667 209.066667c-38.4 0-76.8 12.8-106.666667 42.666666l-8.533333 4.266667c-59.733333 59.733333-59.733333 157.866667 0 217.6L405.333333 682.666667c4.266667 4.266667 8.533333 8.533333 12.8 8.533333l4.266667 4.266667 93.866667 93.866666 136.533333-136.533333 179.2-179.2c59.733333-59.733333 59.733333-157.866667 0-217.6l-4.266667-4.266667c-59.733333-59.733333-157.866667-59.733333-217.6 0L512 345.6 418.133333 251.733333c-29.866667-29.866667-68.266667-42.666667-106.666666-42.666666z" p-id="2598" fill="#fff"></path>
                                </svg>
                                点赞
                            </button>
                            <button @click="()=>{
                                this.showComment = true
                                this.showOparate = false
                                this.prompt='评论'
                            }">
                                <svg t="1664639307088" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="2597" width="20" height="20"
                                     style="position:relative; top: 4px;"
                                >
                                    <path d="M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z" fill="#ffffff" p-id="1392"></path>
                                </svg>
                                评论
                            </button>
                        </div>
                        <p class="bar" @click="showOparate = !showOparate">··</p>
                    </div>
                </div>
                <div class="comment_container">
                    <div>
                        <svg t="1664639307088" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="2597" width="20" height="20"
                             style="position:relative; top: 4px;"
                             v-if="col.likes.length !== 0"
                        >
                            <path d="M512 883.2l-140.8-140.8c-4.266667-4.266667-8.533333-8.533333-17.066667-12.8l-209.066666-209.066667c-85.333333-85.333333-85.333333-221.866667 0-307.2l4.266666-4.266666c85.333333-85.333333 221.866667-85.333333 307.2 0l55.466667 42.666666 46.933333-46.933333c85.333333-85.333333 221.866667-85.333333 307.2 0l4.266667 4.266667c85.333333 85.333333 85.333333 221.866667 0 307.2L512 883.2zM311.466667 209.066667c-38.4 0-76.8 12.8-106.666667 42.666666l-8.533333 4.266667c-59.733333 59.733333-59.733333 157.866667 0 217.6L405.333333 682.666667c4.266667 4.266667 8.533333 8.533333 12.8 8.533333l4.266667 4.266667 93.866667 93.866666 136.533333-136.533333 179.2-179.2c59.733333-59.733333 59.733333-157.866667 0-217.6l-4.266667-4.266667c-59.733333-59.733333-157.866667-59.733333-217.6 0L512 345.6 418.133333 251.733333c-29.866667-29.866667-68.266667-42.666667-106.666666-42.666666z" p-id="2598" fill="#666"></path>
                        </svg>
                        <template v-for="({username},i) in likeNameList">
                            <span class="nick"
                                  @click="()=>toChat(username)"
                            >{{username}}</span>
                            <span v-if="i !== likeNameList.length -1">,</span>
                        </template>
                    </div>

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
                user:{
                    username:null,
                    imgSrc:null
                },
                prompt:"评论",
                likeNameList:[],
                show: false
            }
        },
        components: {comment},
        props: {
            collect: {
                type: Object
            }
        },
        created(){
            let id = this.col.moments.userId;
            this.$http.get("/user", {params:{id}}).then(({data:{userInfo}})=>{
                this.user = userInfo
            })
        },
        methods: {
            toChat(userName){
                // 私信
                this.$router.push({
                    path: '/chat/toChat',
                    query:{userName}
                })
            },
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
                // 评论
                this.commentObj.momentsId = this.col.moments.id
                this.$moments.post("/comment", this.commentObj).then(({data: {msg, code, data}}) => {
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
            update(id, username) {
                // 回复评论
                this.commentObj.replyId = id
                this.showComment = true
                this.prompt = `回复 ${username}`
            },
            like() {
                this.$moments.post("/like", {momentsId: this.col.moments.id})
                    .then(({data: {code, data, msg}}) => {
                        if (code === 200) {
                            if (msg === "点赞成功") {
                                this.col.likes.push(data)
                                this.col.isMyLike = true
                            }else {
                                this.col.likes = this.col.likes.filter(item => item.id !== data.id)
                                this.col.isMyLike = false
                            }
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
                    result = Nyear + "-" + Nmonth + "-" + Ndate
                }
                return result;
            }
        },
        watch:{
            "col.likes":{
                handler(){
                    this.col.likes.map(i=>{
                        let id = i.userId
                        this.$http.get("/user", {params:{id}}).then(({data:{userInfo}})=>{
                            this.likeNameList.push(userInfo)
                        })

                    })
                },
                immediate:true
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
        padding: 0 5px 5px 0;
    }
}

.msg {
    padding-left: 10px;
    line-height: 25px;
    flex: 1;
    .msg_content {
        word-break: break-all;
    }
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