<template>
    <div class="hint flex" @click="toChat">
        <img :src="$store.state.msgHint.from_avater" alt="">
        <div class="msg">
            <h4 class="Title">{{$store.state.msgHint.from}}</h4>
            <p class="text">{{$store.state.msgHint.msg}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "msgHint",
        methods:{
            toChat(){
                // 私信
                this.$router.push({
                    path: '/chat/toChat',
                    query:{userName: this.$store.state.msgHint.username}
                })
            },
        }
    }
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
    .hint{
        width: 300px;
        right: 10px;
    }
}
@media screen and (max-width: 750px) {
    .hint{
        width: 90vw;
        left: 50%;
        transform: translateX(-50%);
        overflow-x: hidden;
    }
}
.hint {
    height: 70px;
    padding: 10px;
    position: fixed;
    z-index: 19999;
    top: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px #888;
    border-radius: 15px;
    img {
        border-radius: 10px;
        width: 50px;
        height: 50px;
    }

    .msg {
        margin-left: 10px;

        .Title {
            font-size: 16px;
            font-weight: 600;
        }
        .text {
            width: 170px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }
}
</style>