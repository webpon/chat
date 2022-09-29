<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'TabBaritem',
  data() {
    return {
      a: 'true',
    }
  },
  props: {
    path: String,
  },
  computed: {
    // 当前路由是什么，哪个tab就高亮
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
  },
  methods: {
    itemClick() {
      console.log(this.path)
      this.$router.replace(this.path)
    },
  },
  created() {
    console.log(this.$route.path)
  },
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  width: 60px;
  height: 60px;
}
.tab-bar-item div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}
.tab-bar-item img {
  margin-top: 3px;
  height: 24px;
  margin-bottom: 2px;
}
</style>
