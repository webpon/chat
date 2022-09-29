<template>
    <div class="container">
        <div class="background">
            <a-icon type="left" class="_back back" @click="back" />
            <img class="moment_back"
                src="https://picx.zhimg.com/80/v2-35857f0199cc225e186098e765dd173c_720w.webp?source=1940ef5c" />
            <img :src="$store.state.myInfo.imgSrc" class="b_avater avater">
        </div>
        <div class="msg_container">
            <div class="moment_msg flex">
                <img :src="$store.state.myInfo.imgSrc" class="_avater">
                <div class="msg">
                    <p class="nick">大傻</p>
                    <p class="msg_content">第一条朋友圈</p>
                    <img class="msg_img"
                        src="https://picx.zhimg.com/80/v2-35857f0199cc225e186098e765dd173c_720w.webp?source=1940ef5c" />
                    <div class="flex oparate">
                        <p>三小时前</p>
                        <p class="bar">··</p>
                    </div>
                    <div class="comment_container">
                        <div class="comment flex">
                            <p class="nick">张三：</p>
                            <p class="comment_content">傻逼</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
export default {

}
</script>
  
<style scoped lang="scss">
@media screen and (max-width: 750px) {
    .bar {
        height: 50px;
        background-color: #fff;
        width: 100vw;
    }
}

.container {
    position: fixed;

    .background {
        position: relative;
        margin-bottom: 20px;

        .avater {
            position: absolute;
            bottom: -15px;
            right: 15px;
        }
    }

    .msg_container {
        padding: 20px 20px 0;

        .nick {
            font-weight: bold;
            color: rgb(37, 37, 206);
        }

        .msg_img {
            height: 200px;
        }
    }

    .msg {
        padding: 0 10px;
        line-height: 25px;
        flex: 1;
    }

    .oparate {
        justify-content: space-between;
        align-items: center;

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

    .comment_container {
        background-color: #ddd;
        border-radius: 3px;
        padding: 1px 5px;
        .comment {
            .nick {
                font-size: 13px;
            }
            .comment_content {
                font-size: 13px;
            }
        }
    }

}

.moment_back {
    height: 230px;
    width: 100vw;
}

.back {
    position: absolute;
    top: 10px;
    color: #fff;
}
</style>
  