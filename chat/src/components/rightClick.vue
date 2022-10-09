<template>
    <div class="rc" :style="{top:axis.y+'px',left:axis.x+'px'}" v-show="show">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "rightClick",
        props:{
            axis:{
                type:Object
            },
            show:{
                type: Boolean
            }
        }
    }
</script>

<style scoped lang="scss">
    .rc {
        position: fixed;
        z-index: 999;
        border: 1px black solid;

        button {
            display: block;
            border: none;
            background-color: #ffffff;
            color: #000000;
            width: 50px;
            height: 20px;
        }

        button:hover {
            background-color: rgba(104, 91, 91, 0.73);
        }

    }
</style>