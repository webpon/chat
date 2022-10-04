<template>
    <div class="container">
        <div class="top-wrapper flex">
            <a-icon type="left" class="_back back" @click="back" />
            <p class="_title">编辑内容</p>
            <a-button :disabled="isDisabled" size="small" class="send_btn" type="primary" @click="sendMsg">发表</a-button>
        </div>
        <div class="edit-container">
            <a-textarea class="cus-area" v-model.trim="message.content" :rows="4" placeholder="这一刻的想法..."></a-textarea>
            <div class="upload flex">
                <img class="upload_img" :src="item" v-for="(item, index) in imgList" :key="index" />
                <div @click="uploadImg" class="upload-wrapper flex center" v-show="imgList.length < 9">
                    <a-icon type="plus" style="font-size: 20px;" />
                </div>
                <input v-show="false" accept="image/*" ref="fileInputPicture" type="file" multiple
                    @change="uploadProgress($event, 'picture')" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: {
                content: '',
                images: []
            },
            imgList: [],
            progress: 0
        };
    },
    computed: {
        isDisabled() {
            return this.message.content === '' && this.message.images.length === 0
        }
    },
    mounted() {

    },
    methods: {
        uploadImg() {
            this.$refs.fileInputPicture.click()
        },
        preImg(files) {
            if (files[0]) {
                for (let index = 0; index < files.length; index++) {
                    var blob = URL.createObjectURL(files[index]);
                    this.imgList.push(blob);
                }
            }
        },
        async uploadProgress(e, type) {
            var files = e.target.files; // js 获取文件对象
            console.log(files);
            if (!files && files.length === 0) return
            const fileMaxSize = 1024 * 1024 * 20
            for (let index = 0; index < files.length; index++) {
                if (files[index].size > fileMaxSize) {
                    this.$message.error('最高支持20MB大小')
                    return
                }
            }
            this.preImg(files)
            const config = {
                onUploadProgress: progressEvent => {
                    let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
                    this.progress = persent
                },
            }
            var form = new FormData(); // FormData 对象
            for (let i = 0; i < files.length; i++) {
                form.append("file", files[i]);
            }
            const { data = {} } = await this.$http.post('http://39.103.233.82:13141/upload', form, config)
            data.fileList.forEach(file => {
                this.message.images.push({
                    url: file,
                    type: 1
                })
            })
        },
        async sendMsg() {
            await this.$moments.post('/moments', this.message)
            this.$message.success('发布成功')
            this.$router.replace('/discover/moments')
        }
    },
};
</script>

<style lang='scss' scoped>
.container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;

    .top-wrapper {
        height: 50px;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
    }

    .send_btn {
        background-color: $color_primary;
        font-size: 12px;
    }

    .edit-container {
        padding: 10px 20px;

        .cus-area {
            resize: none;
            border: none;
            box-shadow: none;
        }
    }

    .upload {
        flex-wrap: wrap;

    }

    .upload_img {
        width: 110px;
        height: 110px;
        margin: 5px 5px 5px 0;
        flex-shrink: 0;
    }

    .upload-wrapper {
        width: 110px;
        height: 110px;
        margin: 5px 5px 5px 0;
        box-sizing: content-box;
        background-color: #eee;
    }
}
</style>
