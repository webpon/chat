<template>
    <div class="hint flex" @click="toChat">
        <img :src="$store.state.msgHint.imgSrc" alt="">
        <div class="msg">
            <h4 class="Title">{{$store.state.msgHint.username}}</h4>
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
.hint {
    width: 350px;
    height: 70px;
    padding: 10px;
    position: fixed;
    z-index: 99;
    top: 10px;
    right: 20px;
    background-color: white;
    box-shadow: 0 0 10px black;
    border-radius: 20px;


    img {
        border-radius: 10px;
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