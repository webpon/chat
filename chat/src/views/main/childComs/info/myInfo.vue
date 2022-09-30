<template>
    <div class="background">
        <div class="avaterContainer">
            <img class="_avater" :src="myInfo.imgSrc" />
            <div class="name-container">
                <p class="nick-name">{{myInfo.username}}</p>
                <p class="status">在线</p>
            </div>
        </div>
        <a-button @click="logout" type="danger" class="logout">注销</a-button>
    </div>
</template>
  
<script>
export default {
    computed: {
        myInfo() {
            return this.$store.state.myInfo
        },
    },
    methods: {
        //退出登录
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('myInfo')
            this.$socket.close()
            this.$router.replace('/login')
        },
    }
}
</script>
  
<style scoped lang="scss">
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
  