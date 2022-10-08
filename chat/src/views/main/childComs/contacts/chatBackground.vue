<template>
  <div class="chatBackground">
    <div class="bac_title">
      Welcome!
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatBackground',
  data() {
    return {}
  },
  components: {},
  created() {},
}
</script>

<style scoped>
.chatBackground {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 310px;
  right: 0;
  height: 100vh;
  background-color: #fff;
}
.bac_title {
  font-size: 23px;
  font-weight: 600;
  line-height: 100vh;
  text-align: center;
}
</style>
