<template>
    <div class="rc" :style="{top:$store.state.rightClick.axis.y+'px',
        left:$store.state.rightClick.axis.x+'px'}"
         v-show="$store.state.rightClick.show">
        <template v-for="event in $store.state.rightClick.events">
            <button @click="event.event" v-if="event.show">{{event.text}}</button>
        </template>
    </div>
</template>

<script>
    export default {
        name: "rightClick",
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