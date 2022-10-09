<template>
    <div>
        <rightClick :axis="delAxis" :show="showDel" >
            <button @click="copy">复制</button>
            <button @click="delComment" v-if="comment.my || comment.admin">删除</button>
        </rightClick>
        <div class="comment flex" @click="reply" @contextmenu.prevent.stop="del"
             @touchstart="handlerTouchstart" @touchmove="handlerTouchmove" @touchend="handlerTouchend">
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
    </div>
</template>

<script>
    import {Dialog} from "vant";
    import rightClick from "../rightClick";

    export default {
        name: "comment",
        components:{rightClick},
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
                },
                delAxis:{
                    x:100,
                    y:100
                },
                showDel: false
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
            },
            delComment() {
                Dialog.confirm({
                    title: '提示',
                    message: '删除该评论？',
                }).then(()=>{
                    this.$moments.delete("/comment", {
                        data:{id: this.comment.id}
                    }).then(({data:{code,data}})=>{
                           if (code === 200){
                               this.$emit("del", data.id)
                           }
                    })
                })
            },
            del({x,y}){
                this.delAxis.x = x
                this.delAxis.y = y
                this.showDel = true
                const del = e => {
                    this.showDel = false
                    document.removeEventListener("click", del)
                }
                document.addEventListener('click',del)

            },
            handlerTouchstart () {
                this.loop = setTimeout(() => {
                    this.loop = 0
                    // 执行长按要执行的内容
                    this.showDel = false
                }, 500) // 定时的时间
                return false
            },
            handlerTouchmove () {
                // 清除定时器
                clearTimeout(this.loop)
                this.loop = 0
            },
            handlerTouchend () {
                // 清除定时器
                clearTimeout(this.loop)
                if (this.loop !== 0) {
                    // 单击操作
                    this.clickShow = true
                    this.longClickShow = false
                }
            },
            copy(){
                var textareaC = document.createElement('textarea');
                textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
                textareaC.value = this.comment.content;
                document.body.appendChild(textareaC); //将textarea添加为body子元素
                textareaC.select();
                var res = document.execCommand('copy');
                document.body.removeChild(textareaC);//移除DOM元素
                return res;
            }
        }

    }
</script>

<style scoped lang="scss">
    .comment {
        font-size: 13px;
        .nick {
            color: rgb(37, 37, 206);
        }
    }

</style>