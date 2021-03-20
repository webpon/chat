<template>
  <div class="listItem" @click="toChat" :class="{ active: isActive == true }">
    <div class="list_avater_container">
      <img :src="contactsInfo.imgSrc" alt="" :key="Math.random()" />
    </div>
    <div class="msgContainer">
      <p class="Title">
        {{ contactsInfo.username }}
      </p>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    contactsInfo: {
      type: Object,
      default: {},
    },
  },
  components: {},
  methods: {
    toChat() {
      if(this.contactsInfo.username === JSON.parse(localStorage.myInfo).username){
        this.alertWheel.div.add(this.alertWheel.button).add(this.alertWheel.p).show()
        console.log(this.alertWheel.element);
        return
      }
       console.log(this.contactsInfo);
      this.bus.$emit('chatUser',this.contactsInfo)
      this.$router.push({
        path: '/chat/toChat',
        query: { userName: this.contactsInfo.username },
      })
    },
  },
}
</script>

<style scoped>
.listItem {
  height: 65px;
  /* width: 100%; */
  background-color: #eae8e7;
  display: flex;
  padding: 12px;
  /* cursor: pointer; */
}
.listItem:hover {
  background-color: #cac8c6;
}
.list_avater_container {
  width: 60px;
}
.list_avater_container img {
  width: 42px;
  height: 42px;
}
.msgContainer {
}
.Title {
  font-size: 16px;
  font-weight: 600;
  line-height: 41px;
}
.text {
  /* line-height: 10px; */
  text-align: left;
}
</style>
<style>
.listItem p {
  margin-bottom: 0;
  -moz-user-select: none;

  -webkit-user-select: none;

  user-select: none;
}
.active {
  /* background-color: red !important; */
}
</style>
