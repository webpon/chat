<template>
  <div>
    <div class="messageWarpper">
      <!-- <img :src="sendmsg.from.imgSrc" alt="" /> -->
      <img src="~assets/logo.png" alt=""/>
      <span class="msgCard">
        {{ sendmsg.msg }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      
    }
  },
  components: {},
  props: {
    sendmsg: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style scoped>
.messageWarpper {
  position: relative;
  float: left;
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
  left: 10px;
  top: 8px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
}
</style>
