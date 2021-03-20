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
    return {}
  },
  components: {},
  methods: {
    back() {
      this.$router.push({ path: '/chat'});
    },
  },
}
</script>

<style scoped>
.chatTitle {
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  /* align-items: center; */
  line-height: 66px;
  padding-left: 20px;
  height: 66px;
  width: 100%;
  background-color: #f5f5f5;
  font-size: 20px;
  flex-wrap: 600;
  border-bottom: 3px solid #f0f0f0;
}
.msg_title {
}
.back {
  cursor: pointer;
  padding: 0 10px;
}
</style>
