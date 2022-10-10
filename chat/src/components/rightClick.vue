<template>
    <div class="rc" :style="{top:$store.state.rightClick.axis.y+'px',
        left:$store.state.rightClick.axis.x+'px'}"
         v-show="$store.state.rightClick.show">
        <template v-if="['msgItem','chatForm', 'comment'].includes(event.type)">
            <button @click="event['copy']">复制</button>
        </template>
        <template v-if="event.type === 'chatForm'">
            <button @click="event['paste']">粘贴</button>
        </template>
        <template v-if="event.type === 'comment'">
            <button @click="event['del']" v-if="showEvent['del']" class="del">删除</button>
        </template>
        <template v-if="event.type === 'listItem'">
            <button @click="event['del']">删除聊天</button>
        </template>
    </div>
</template>

<script>
    export default {
        name: "rightClick",
        computed:{
            event(){
                return this.$store.state.rightClick.event
            },
            showEvent(){
                return this.$store.state.rightClick.showEvent
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
            /*width: 50px;*/
            height: 20px;
        }

        button:hover {
            background-color: rgba(104, 91, 91, 0.73);
        }

        .del{
            background-color: red;
            color: #ffffff;
        }
        .del:hover {
            background-color: rgba(255, 91, 91, 0.73);
        }
    }

</style>