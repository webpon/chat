<template>
    <div class="comment flex">
        <p class="nick">张三：</p>
        <p class="comment_content">傻逼</p>
    </div>
</template>

<script>
    export default {
        name: "comment"
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