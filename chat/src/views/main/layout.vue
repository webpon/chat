<template>
  <div>
    <div class="container">
      <!-- 最左侧导航栏 -->
      <div class="asider_container" v-show="$route.path !== '/chat/toChat' || !$store.state.isMobile">
        <asiderNav />
      </div>
      <!-- 导航栏切换的页面 -->
      <div class="content_container">
        <keep-alive exclude="chatBody">
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import asiderNav from './childComs/nav/navBar.vue'
export default {
  name: 'layout',
  data() {
    return {}
  },
  components: { asiderNav },
  created() { },
  methods: {},
  mounted() {
    // let middle = document.querySelector('#middle_container')
    // console.log(middle);
    // //自适应窗口
    // if (window.innerWidth < 1600) {
    //   middle.style.width = window.innerWidth + 'px'
    // }
    // window.addEventListener('resize', function() {
    //   if (window.innerWidth < 1600) {
    //     middle.style.width = window.innerWidth + 'px'
    //   } else {
    //     middle.style.width = '1600px'
    //   }
    // })
  },
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .content_container {
    left: 60px;
  }

  /* 最左侧导航栏布局 */
  .asider_container {
    top: 0;
    width: 60px;
    height: 100vh;
  }
}

@media screen and (max-width: 750px) {
  .content_container {
    left: 0;
  }

  /* 最左侧导航栏布局 */
  .asider_container {
    bottom: 0;
    width: 100vw;
    height: 60px;
  }
}
/* 最左侧导航栏布局 */
.asider_container {
    position: fixed;
    left: 0;
    z-index: 1000;
  }
/* 右侧部分布局 */
.content_container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: auto;
  width: auto;
}
</style>
