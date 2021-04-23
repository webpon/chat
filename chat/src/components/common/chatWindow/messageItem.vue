<template>
  <div>
    <div class="messageWarpper">
      <!-- <img :src="sendmsg.from.imgSrc" alt="" /> -->
      <img :src="imgSrc" alt=""/>
      <span class="nick">{{sendmsg.from}}</span>
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
  computed:{
    imgSrc(){
      let imgSrc
      this.$store.state.contacts.forEach(item => {
          console.log(item);
          if (item.username === this.sendmsg.from) {
            console.log(item);
            imgSrc = item.imgSrc
          }
        });
      return imgSrc || require('../../../assets/offline.jpg')
    }
  }
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
.nick{
  font-size: 10px;
  position: absolute;
  top: 0px;
  left: 84px;
  font-weight: bold;
  color: blue;
}
.messageWarpper img {
  width: 45px;
}
.msgCard {
  /* display: inline-block; */
  position: relative;
  left: 10px;
  top: 18px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
}
</style>
