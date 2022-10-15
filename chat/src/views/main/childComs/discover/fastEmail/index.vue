<template>
    <div class="container" ref="container">
        <van-nav-bar title="快捷邮箱" left-arrow @click-left="onClickLeft"/>
        <van-form @submit="onSubmit" :disabled="isLoading">
            <van-field v-model="from_email" name="from_email" label="发送者(可选)" placeholder="发送者邮箱 / 备注" />
            <van-field v-model="to_email" name="to_email" label="接收者" placeholder="接收者邮箱"
                :rules="[{ pattern: to_pattern, required: true, message: '请正确输入' }]" />
            <van-field v-model="email_content" name="email_content" label="内容" placeholder="请输入内容"
                :rules="[{ required: true, message: '不允许为空' }]" />
            <div style="margin: 16px;">
                <van-button :loading="isLoading" loading-type="spinner" round block type="info" native-type="submit">发送
                </van-button>
            </div>
        </van-form>
        <van-dialog v-model="show" :title="title" style="text-align: center;">
            <van-icon name="checked" color="green" size="50px" style="line-height: 120px;" v-if="isSuccess" />
            <van-icon name="clear" color="red" size="50px" style="line-height: 120px;" v-else />
        </van-dialog>
    </div>
</template>

<script>
export default {
    name: "momentsView",
    data() {
        return {
            from_email: '',
            to_email: '',
            email_content: '',
            to_pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            show: false,
            isSuccess: false,
            title: '',
            isLoading: false
        }
    },
    mounted() {
        this.$refs.container.style.height = `${window.innerHeight}px`
        this.$refs.container.addEventListener('scroll', this.checkIsBottom)
        //监听消息
        this.$socket.on('emailOver', (data) => {
            const { flag = false, msg = '' } = data || {}
            this.isLoading = false
            this.show = true
            this.isSuccess = flag
            this.title = msg
            this.email_content = ''
        })
    },
    methods: {
        onSubmit(value) {
            this.isLoading = true
            value.from = this.$store.state.myInfo.username
            this.$socket.emit('sendEmail', value)
        }
    },
    activated() {
        this.from_email = ''
        this.to_email = ''
        this.email_content = ''
        this.isLoading = false
    }
}
</script>

<style scoped lang="scss">
.container {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
}
</style>
  