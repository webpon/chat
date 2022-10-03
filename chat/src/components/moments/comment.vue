<template>
    <div class="comment flex" @click="reply">
        <p>
            <span class="nick">{{user.username}}</span>
            <span v-if="comment.replyId !== 0">
                回复
                <span class="nick">{{replyUser.username}}</span>
            </span>
            ：
        </p>
        <p class="comment_content">{{comment.content}}</p>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: {
            comment: {
                type: Object
            },
            replyId:{
                type:String
            }
        },
        data(){
            return {
                user:{
                    username:null,
                    imgSrc:null
                },
                replyUser:{
                    username:null,
                    imgSrc:null
                }
            }
        },
        created(){
            let id = this.comment.userId;
            this.$http.get("/user", {params:{id}}).then(({data:{userInfo}})=>{
                this.user = userInfo
            })
        if (this.replyId !== undefined) {
                id = this.replyId
                console.log(id)
                this.$http.get("/user", {params: {id}}).then(({data: {userInfo}}) => {
                    this.replyUser = userInfo
                })
            }
        },
        methods: {
            reply() {
                this.$emit("send", this.comment.replyId === 0 ?
                    this.comment.id : this.comment.replyId, this.user.username)
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment {
        .nick {
            font-size: 13px;
            color: rgb(37, 37, 206);
        }

        .comment_content {
            font-size: 13px;
        }
    }

</style>