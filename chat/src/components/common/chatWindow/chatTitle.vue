<template>
  <div class="chatTitle">
    <h3 class="msg_title">
      <a-icon type="left" class="back" @click="back"></a-icon>
      {{ $route.query.userName }}
    </h3>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      value:null
    }
  },
  watch:{
    "$store.state.chatList":{
      handler(newArr){
        let b = true
        newArr.forEach((item,i)=>{
          if (item.username === this.$route.query.userName) {
            this.$store.state.chatList[i].msgNumber = 0
            b = false
          }
        })
        if (b){
          this.$router.push({ path: '/chat'});
        }
      },
      deep:true
    }
  },
  components: {},
  methods: {
    back() {
      this.$router.push({ path: '/chat'});
    },
  },
}
</script>

<style scoped lang="scss">

.chatTitle {
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  /* align-items: center; */
  line-height: 66px;
  padding-left: 5px;
  height: 66px;
  width: 100%;
  background-color: #f5f5f5;
  font-size: 20px;
  flex-wrap: 600;
  border-bottom: 3px solid #f0f0f0;
}
.back {
  cursor: pointer;
  padding: 0 10px;
}
</style>
