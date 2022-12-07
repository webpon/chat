<template>
    <div class="msg_container">
        <div class="moment_msg flex">
            <img :src="user.imgSrc" class="_avater pointer _img-scale" @click="toChat(user.username)">
            <div class="msg">
                <span class="nick pointer" @click="toChat(user.username)">{{user.username}}</span>
                <p v-if="contentLink = getUrl(col.moments.content)">
                    <a style="text-decoration: underline;" :href="contentLink">{{col.moments.content}}</a>
                </p>
                <p v-else class="msg_content">{{col.moments.content}}</p>
                <div v-if="col.moments.images.length === 1">
                    <img v-if="col.moments.images[0].type === 1" v-lazy="col.moments.images[0].url" class="msg_img _img-scale"
                        @click="previewImg(0)">
                    <video-player @play="onPlayerPlay" ref="videoPlayer" v-else
                                    :options="{height: 200,
                                    sources: [{src: col.moments.images[0].url}]}"
                                    style="width: 100%;height: 100%" />
                </div>
                <div v-else>
                    <template v-for="(image, index) in col.moments.images">
                        <img v-if="image.type === 1" v-lazy="image.url" class="msg_img _img-scale" alt=""
                            style="width: 80px; height: 80px;" @click="previewImg(index)">
                    </template>
                </div>
                <div class="flex oparate">
                    <div>
                        <p>{{col.moments.timeDesc}}</p>
                        <span class="pointer" v-if="col.moments.my || col.moments.admin" @click="deleteMoments">删除</span>
                    </div>
                    <div>
                        <div v-show="showOparate">
                            <button @click="like" v-if="collect.isMyLike"  class="pointer">
                                <van-icon name="like" color="red"/>
                                取消
                            </button>
                            <button @click="like" v-else  class="pointer">
                                <van-icon name="like-o" />
                                点赞
                            </button>
                            <button @click="()=>{
                                this.showComment = true
                                this.showOparate = false
                                this.prompt='评论'
                            }">
                                <van-icon name="comment" />
                                评论
                            </button>
                        </div>
                        <p class="bar pointer" @click="showOparate = !showOparate">··</p>
                    </div>
                </div>
                <div class="comment_container">
                    <div v-if="likeNameList.length >= 1 ">
                        <van-icon name="like" color="red" style="padding-right: 3px;"/>
                        <span v-for="({username},i) in likeNameList" :key="i">
                            <span class="nick pointer" 
                                  @click="()=>toChat(username)"
                            >{{username}}</span>
                            <span v-if="i !== likeNameList.length -1">, </span>
                        </span>
                    </div>

                    <div v-for="item in col.comments" :key="item.id">
                        <comment :comment="item" @send="update" @del="delComment"/>
                        <comment v-if="item.children.length > 0" v-for="c in item.children" :comment="c" :key="c.id"
                            :reply-id="item.userId" @del="delComment"/>
                    </div>
                    <div class="comment" v-show="showComment">
                        <a-input style="height: 30px;" :maxLength="200" :placeholder="prompt" v-model.trim="commentObj.content"
                            @pressEnter.prevent="sendMsg" ref="input"/>
                        <a-button @click="sendMsg" style="height: 28px;">发送</a-button>
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
                show: false,
                contentLink: ''
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
            this.col.likes.map(i=>{
                let id = i.userId
                this.$http.get("/user", {params:{id}}).then(({data:{userInfo}})=>{
                    this.likeNameList.push({...userInfo, id})
                })
            })
        },
        methods: {
            getUrl(str) {
                const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
                const strValue = str.match(reg);
                if (strValue && strValue.length > 0) {
                return strValue[0];
                }
                return null;
            },
            delComment(id){
                this.col.comments = this.col.comments.filter(item => item.id !== id)
            },
            toChat(userName){
                // 私信
                if (userName === this.$store.state.myInfo.username) {
                    this.alertWheel.div.add(this.alertWheel.button).add(this.alertWheel.p).show()
                    return
                }
                let c = {
                    ...this.user,
                    msg: null,
                    msgNumber:0
                }
                this.$store.commit('updateChatList', c)

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
                console.log('-=-=-=-=-');
                
                this.$moments.post("/like", {momentsId: this.col.moments.id})
                    .then(({data: {code, data, msg}}) => {
                        if (code === 200) {
                            if (msg === "点赞成功") {
                                this.col.likes.push(data)
                                this.col.isMyLike = true
                                let id = data.userId
                                this.$http.get("/user", {params:{id}}).then(({data:{userInfo}})=>{
                                    this.likeNameList.push({...userInfo, id})
                                })
                            }else {
                                let list = []
                                this.col.likes.forEach((item)=>{
                                       if (item.id !== data.id){
                                           list.push(item)
                                       }
                                })
                                console.log(data.userId);
                                console.log(this.likeNameList);
                                
                                this.likeNameList = this.likeNameList.filter((item)=>{
                                    return item.id !== data.userId
                                })
                                this.col.likes = list
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
        watch:{
            showComment(){
                setTimeout(()=>{
                    this.$refs.input.focus()
                },100)
            }
        }
    }
</script>

<style scoped lang="scss">
.msg_container {
    padding: 20px;
    .nick {
        font-weight: bold;
        color: rgb(37, 37, 206);
    }

    .msg_img {
        max-height: 400px;
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
        background-color: rgba($color: #ddd, $alpha: 0.6);
        border-radius: 3px;
        padding: 0px 5px;
    }

    .comment {
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        button {
            width: 60px;
            border: none;
        }

        .ant-input {
            height: 100%;
        }
    }
</style>