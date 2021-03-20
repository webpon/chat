<template>
  <div>
    <div class="messageWarpper" v-if="sendmsg !== null">
      <span class="msgCard">
        {{ sendmsg.msg }}
      </span>
      <!-- <img :src="sendmsg.from.imgSrc" alt="" /> -->
      <img :src="myInfo.imgSrc" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
       myInfo: this.$store.state.myInfo
    }
  },
  props: {
    sendmsg: {
      type: Object,
      default: {},
    },
  },
  components: {},
  computed: {},
  created() {
    // console.log(this.$store.state.activeUser.username)
  },
}
</script>

<style scoped>
.messageWarpper {
  position: relative;
  float: right;
  display: inline-block;
  padding: 0 25px;
  margin: 10px 0;
  /* background-color: red; */
}
.messageWarpper img {
  width: 45px;
}
.msgCard {
  /* display: inline-block; */
  position: relative;
  right: 10px;
  top: 8px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  background-color: skyblue;
}
</style>
