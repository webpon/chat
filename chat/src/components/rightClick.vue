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
        max-width: 100px;

        button {
            display: block;
            border: none;
            color: #000000;
            width: 100%;
            height: 20px;
            background-color: #ffffff;
        }

        button:hover {
            background-color: rgb(189, 185, 185);
            color: #ffffff;
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