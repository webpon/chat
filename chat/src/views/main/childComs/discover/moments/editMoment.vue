<template>
    <div class="container">
        <div class="top-wrapper flex">
            <a-icon type="left" class="_back back" @click="back" />
            <p class="_title">编辑内容</p>
            <a-button :disabled="isDisabled" size="small" class="send_btn" type="primary" @click="sendMsg">发布</a-button>
        </div>
        <div class="edit-container">
            <a-textarea class="cus-area" v-model.trim="message.content" :rows="4" placeholder="这一刻的想法..."></a-textarea>
            <div class="upload flex">
                <input v-show="false" accept="image/*" ref="fileInputPicture" type="file" multiple
                    @change="uploadProgress($event, 'picture')" />
                <van-uploader :preview-size="115" v-model="imgList" :max-count="9" :max-size="(1024 * 1024 * 20)"
                    :after-read="(file) => uploadProgress(file, 'picture')" @delete="deleteImg"
                    @oversize="onOversize" />
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    data() {
        return {
            message: {
                content: '',
                images: []
            },
            imgList: [],
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
        deleteImg(e) {
            const index = this.message.images.findIndex(item => {
                return item.flag === e.flag
            })
            if (index > -1) {
                this.message.images.splice(index, 1)
            }
        },
        onOversize() {
            Toast('文件大小不能超过 2MB');
        },
        async uploadProgress(fileObj, type) {
            const { file } = fileObj;
            fileObj.status = 'uploading';
            fileObj.message = '上传中...';
            fileObj.flag = Date.now()
            if (!file) return
            var form = new FormData(); // FormData 对象
            form.append("file", file);
            try {
                const { data = {} } = await this.$http.post('http://39.103.233.82:13141/upload', form)
                fileObj.status = 'done';
                fileObj.message = '上传完毕';
                data.fileList.forEach(file => {
                    this.message.images.push({
                        url: file,
                        type: 1,
                        flag: fileObj.flag
                    })
                })
            } catch (error) {
                fileObj.status = 'failed';
                fileObj.message = '上传失败';
            }
        },
        async sendMsg() {
            if (this.$store.state.myInfo.type === 'visitor') {
                this.$message.error('游客不允许发布朋友圈')
                this.$router.replace('/discover/moments')
                return
            }
            await this.$moments.post('/moments', this.message)
            this.$message.success('发布成功')
            this.$router.replace('/discover/moments')
            this.message.content = ""
            this.message.images = []
            this.imgList = []
        }
    },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
    .container {
        width: 500px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 750px) {
    .container {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
}

.container {
    position: fixed;
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
}
</style>
